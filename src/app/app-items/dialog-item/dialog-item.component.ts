import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';

import { Producto } from './../../models/Producto';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service'; // Importa el servicio
import { ChiptagsService } from '../../services/chiptags.service';



@Component({
  selector: 'app-dialog-item',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    GalleriaModule,
    MatButtonModule,
    MatIcon,
    RatingModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.scss'
})
export class DialogItemComponent {
  images: string[] = [];
  chiptags: string[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productosService: ProductosService, // Inyecta el servicio
    private chiptagsService: ChiptagsService, // Inyecta el servicio
  )
  {
    this.images = this.data.imagenes;
  }

  ngOnInit() {
    for (let i = 0; i < this.data.Etiquetas.length; i++) {
      //console.log('AAAAAAAAAAAAAAAAJAJAJA');
      const chiptag = this.chiptagsService.obtenerChiptagPorId(this.data.Etiquetas[i]);
      //console.log(chiptag);
      if (chiptag && chiptag.tag !== undefined) {
        this.chiptags.push(chiptag.tag);
      }
    }
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
