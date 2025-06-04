import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';

import { Producto } from '../../../models/Producto';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductosService } from '../../../services/productos.service'; // Importa el servicio
import { ChiptagsService } from '../../../services/chiptags.service';
import { PlataformasService } from '../../../services/plataformas.service';
import { SvgIconComponent } from '../../../canvas/svg-icon/svg-icon.component';
import { Plataforma } from '../../../models/Plataforma';
import { MatOption, MatSelect } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { Categoria } from '../../../models/Categoria';
import { CategoriasService } from '../../../services/categorias.service';

import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FileUploadEvent } from 'primeng/fileupload';
import { StorageService } from '../../../services/storage.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
/*
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
*/



@Component({
  selector: 'app-upload-product-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    GalleriaModule,
    MatButtonModule,
    MatIcon,
    RatingModule,
    MatChipsModule,
    FormsModule,
    SvgIconComponent,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    FileUpload,
    ToastModule,
    ButtonModule
  ],
  templateUrl: './upload-product-dialog.component.html',
  styleUrl: './upload-product-dialog.component.scss'
})



// ...existing imports...

export class UploadProductDialogComponent implements OnInit {

categSelected: Categoria | null = null;
platfSelected: Plataforma | null = null;


  uploadedFiles: File[] = [];
  plataformas: Plataforma[] = [];
  categorias: Categoria[] = [];
  sanitizedImages: SafeUrl[] = [];

  productoFinal!: Producto;

  private _formBuilder = inject(FormBuilder);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private sanitizer: DomSanitizer,
    private productosService: ProductosService,
    private chiptagsService: ChiptagsService,
    private plataformasService: PlataformasService,
    private categoriasService: CategoriasService,
    private storageService: StorageService,
  ) {}

  firstFormGroup = this._formBuilder.group({
    titulo: ['', Validators.required],
    desc: ['', Validators.required],
    Precio: ['', Validators.required],
    Cantidad: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  updateSanitizedImages() {
    // Usa los archivos subidos (uploadedFiles) para la vista previa
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      this.sanitizedImages = this.uploadedFiles.map((file: File) =>
        this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      );
    } else {
      this.sanitizedImages = [];
    }
  }

   setProductoFinal() {
    const formValues = this.firstFormGroup.value;

    this.productoFinal = new Producto(
      '', // Id, se asignará en backend
      formValues.titulo ?? '',
      Number(formValues.Precio ?? 0),
      Number(formValues.Cantidad ?? 0),
      formValues.desc ?? '',
      this.uploadedFiles.map(f => f.name), // imagenes
      this.categSelected?.Id ?? '', // Categoria usando categSelected
      Array.isArray(this.platfSelected?.Id) ? this.platfSelected.Id : [this.platfSelected?.Id ?? ''], // Plataformas usando platfSelected
      Number(formValues.Cantidad ?? 0), // stock
      new Date(), // fecha
      0, // rating inicial
      0, // likes inicial
      0, // dislikes inicial
      [] // Etiquetas
    );

    // Actualiza la vista previa de imágenes si es necesario
    this.updateSanitizedImages();

    console.log('Producto final:', this.productoFinal);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      const nuevoNombre = `${Date.now()}_${file.name}`;
      const renamedFile = new File([file], nuevoNombre, { type: file.type });
      this.uploadedFiles.push(renamedFile);
    }
    this.updateSanitizedImages(); // Actualiza la vista previa después de subir
  }

  subirProducto() {
    // 1. Subir imágenes al storage en la ruta "images/products/" y obtener los nombres/URLs
    const uploadObservables = this.uploadedFiles.map(file => {
      // Creamos un nuevo File con el mismo contenido pero cambiando el nombre para incluir la ruta
      const nombreConRuta = `images/products/${file.name}`;
      const fileWithPath = new File([file], nombreConRuta, { type: file.type });
      return this.storageService.uploadImage(fileWithPath);
    });

    // Espera a que todas las imágenes se suban antes de crear el producto
    Promise.all(uploadObservables.map(obs => obs.toPromise()))
      .then((results: any[]) => {
        // Si tu backend devuelve el nombre del archivo, úsalo aquí
        // Si no, usa this.uploadedFiles.map(f => f.name)
        const imagenes = results.map((res, idx) => {
          // Si el backend devuelve { filename: 'images/products/archivo.jpg' }
          // Extraemos solo el nombre del archivo para guardar en el producto
          let fullName = res.filename || this.uploadedFiles[idx].name;
          // Extraer solo el nombre del archivo (sin ruta)
          const soloNombre = fullName.split('/').pop() || fullName;
          return soloNombre;
        });

        // Actualiza las imágenes en productoFinal solo con el nombre
        this.productoFinal.imagenes = imagenes;

        // Actualiza sanitizedImages para la vista previa con las URLs del storage
        this.sanitizedImages = imagenes.map(filename =>
          this.sanitizer.bypassSecurityTrustUrl(
            this.storageService.getImageUrl(`images/products/${filename}`)
          )
        );

        // 2. Subir el producto usando el servicio de productos
        this.productosService.agregarProducto(this.productoFinal).subscribe({
          next: (productoCreado) => {
            // Aquí puedes mostrar un mensaje de éxito o cerrar el diálogo
            console.log('Producto creado:', productoCreado);
          },
          error: (err) => {
            // Manejo de error
            console.error('Error al crear producto:', err);
          }
        });
      })
      .catch(err => {
        // Manejo de error en la subida de imágenes
        console.error('Error al subir imágenes:', err);
      });
  }

  ngOnInit() {
    this.categoriasService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    this.plataformasService.obtenerPlataformas().subscribe((plataformas: Plataforma[]) => {
      this.plataformas = plataformas;
    });
  }
}
