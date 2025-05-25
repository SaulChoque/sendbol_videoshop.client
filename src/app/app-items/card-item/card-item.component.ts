import {ChangeDetectionStrategy, Component, Input, viewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { SvgIconComponent } from '../../canvas/svg-icon/svg-icon.component';



import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

//import {DialogItemComponent} from '../dialog-item/dialog-item.component';
import {Producto} from './../../models/Producto';
import { DialogItemComponent } from '../dialog-item/dialog-item.component';
import { PlataformasService } from '../../services/plataformas.service';




@Component({
  selector: 'app-card-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
    SvgIconComponent,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  constructor(
    public dialog: MatDialog,
    private plataformaService: PlataformasService,

  ) {}


  isExpanded = false;
  plataformas: string[] = [];

  @Input( {
    required: true,
  } )
  producto?: Producto;

  ngOnInit() {
    if (this.producto && this.producto.Plataformas) {
      for (let i = 0; i < this.producto.Plataformas.length; i++) {
        //console.log('AAAAAAAAAAAAAAAAJAJAJA');
        const plataforma = this.plataformaService.obtenerPlataformaPorId(this.producto.Plataformas[i]);
        console.log(plataforma);
        //console.log(chiptag);
        if (plataforma && plataforma.icon !== undefined) {
          this.plataformas.push(plataforma.icon);
        }
      }
    }
  }

  //@Input({required: true}) isExpanded?: boolean;

  mouseEnter(): void {
    //console.log(this.producto);
    this.isExpanded = true;
    //console.log('Mouse enter!');
  }

  mouseLeave(): void {
    this.isExpanded = false;
    //console.log('Mouse leave!');
  }


  openDialog(productox?: Producto): void {
    this.dialog.open(DialogItemComponent, {

      height: 'fit-content',
      minWidth: 'fit-content',

      data: productox,
      scrollStrategy: new NoopScrollStrategy()

    });

    //console.log('Open dialog!');
  }
}






