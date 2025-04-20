import { Component, Inject, model } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { GalleriaModule } from 'primeng/galleria';

import { Producto } from './../../models/Producto';
import { PRODUCTOS } from './../../models/constants';

import { IMAGESS } from '../../services/photoservice';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-dialog-item',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    GalleriaModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.scss'
})
export class DialogItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Producto) {
  }
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
