import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';


import { Producto } from './../../models/Producto';
import { PRODUCTOS } from './../../models/constants';

@Component({
  selector: 'app-dialog-item',
  imports: [
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.scss'
})
export class DialogItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Producto) {
  }
}
