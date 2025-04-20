import {ChangeDetectionStrategy, Component, Input, viewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

//import {DialogItemComponent} from '../dialog-item/dialog-item.component';
import {Producto} from './../../models/Producto';
import { DialogItemComponent } from '../dialog-item/dialog-item.component';




@Component({
  selector: 'app-card-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  constructor(public dialog: MatDialog) {}


  isExpanded = false;

  @Input( {
    required: true,
  } )
  producto?: Producto;



  //@Input({required: true}) isExpanded?: boolean;

  mouseEnter(): void {
    this.isExpanded = true;
    console.log('Mouse enter!');
  }

  mouseLeave(): void {
    this.isExpanded = false;
    console.log('Mouse leave!');
  }


  openDialog(productox?: Producto): void {
    this.dialog.open(DialogItemComponent, {

      height: 'fit-content',
      minWidth: 'fit-content',

      data: productox

    });

    console.log('Open dialog!');
  }
}
