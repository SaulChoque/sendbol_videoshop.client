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



export class UploadProductDialogComponent implements OnInit {
  uploadedFiles: any[] = [];
  plataformas: Plataforma[] = [];
  categorias: Categoria[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productosService: ProductosService, // Inyecta el servicio
    private chiptagsService: ChiptagsService,
    private plataformasService: PlataformasService,
    private categoriasService: CategoriasService,

  ){}

  onUpload(event: FileUploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


  ngOnInit() {
    this.categoriasService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    this.plataformasService.obtenerPlataformas().subscribe((plataformas: Plataforma[]) => {
      this.plataformas = plataformas;
    });
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });





}
