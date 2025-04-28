import { Component, Inject, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';

import { Producto } from './../../models/Producto';

import { IMAGESS } from '../../services/photoservice';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';


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
  ],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.scss'
})
export class DialogItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Producto) {
  }



  value!: number;
  images = IMAGESS;

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


}
