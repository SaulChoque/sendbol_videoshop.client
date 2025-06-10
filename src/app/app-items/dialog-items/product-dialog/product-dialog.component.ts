import { Component, Inject } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service'; // Importa el servicio
import { EtiquetasService } from '../../../services/etiquetas.service';
import { PlataformasService } from '../../../services/plataformas.service';
import { SvgIconComponent } from '../../../canvas/svg-icon/svg-icon.component';
import { Plataforma } from '../../../models/Plataforma';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-product-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    GalleriaModule,
    MatButtonModule,
    MatIcon,
    RatingModule,
    MatChipsModule,
    FormsModule,
    SvgIconComponent
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  images: string[] = [];
  etiquetas: string[] = [];
  plataformas: Plataforma[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productosService: ProductosService, // Inyecta el servicio
    private EtiquetasService: EtiquetasService,
    private plataformasService: PlataformasService,
    private storageService: StorageService
  )
  {
    this.images = this.data.imagenes;
  }

  ngOnInit() {
    for (let i = 0; i < this.data.Etiquetas.length; i++) {
      ////console.log('AAAAAAAAAAAAAAAAJAJAJA');
      const etiqueta = this.EtiquetasService.obtenerEtiquetaPorId(this.data.Etiquetas[i]);
      ////console.log(etiqueta);
      if (etiqueta && etiqueta.tag !== undefined) {
        this.etiquetas.push(etiqueta.tag);
      }
    }
    for (let i = 0; i < this.data.Plataformas.length; i++) {
      ////console.log('AAAAAAAAAAAAAAAAJAJAJA');
      const plataforma = this.plataformasService.obtenerPlataformaPorId(this.data.Plataformas[i]);
      ////console.log(plataforma);
      ////console.log(etiqueta);
      if (plataforma !== undefined) {
        this.plataformas.push(plataforma);
      }
    }
  }

  getProductsImageUrl(filename: string) {
    const basicUrl = 'images/products/'
    return this.storageService.getImageUrl(basicUrl+filename);
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  onRate(event: any) {
    const nuevoRating = event.value;
    // Envía el nuevo rating al backend usando el servicio
    this.productosService.actualizarRating(String(this.data.Id), nuevoRating).subscribe({
      next: () => {
        // Opcional: mostrar mensaje de éxito o actualizar UI
      },
      error: (err) => {
        // Opcional: manejar error
        console.error('Error al actualizar rating:', err);
      }
    });
  }

  // ...existing code...

    onLike() {
      this.data.likes++;
      // Envía los nuevos valores de likes y dislikes al backend
      this.productosService.actualizarLikesDislikes(String(this.data.Id), this.data.likes, this.data.dislikes).subscribe({
        next: () => {
          // Opcional: mostrar mensaje de éxito o actualizar UI
        },
        error: (err) => {
          // Opcional: manejar error
          console.error('Error al actualizar likes:', err);
        }
      });
    }

    onDislike() {
      this.data.dislikes++;
      // Envía los nuevos valores de likes y dislikes al backend
      this.productosService.actualizarLikesDislikes(String(this.data.Id), this.data.likes, this.data.dislikes).subscribe({
        next: () => {
          // Opcional: mostrar mensaje de éxito o actualizar UI
        },
        error: (err) => {
          // Opcional: manejar error
          console.error('Error al actualizar dislikes:', err);
        }
      });
    }

  // ...existing code...
}
