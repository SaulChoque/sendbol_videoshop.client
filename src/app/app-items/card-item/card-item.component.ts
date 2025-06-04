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

//import {ProductDialogComponent} from '../dialog-itemss/dialog-items.component';
import {Producto} from './../../models/Producto';
import { ProductDialogComponent } from '../dialog-items/product-dialog/product-dialog.component';
import { PlataformasService } from '../../services/plataformas.service';
import { StorageService } from '../../services/storage.service';



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
    private storageService: StorageService

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

  getCardImageUrl(filename: string) {
    const basicUrl = 'images/products/'
    return this.storageService.getImageUrl(basicUrl+filename);
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
    this.dialog.open(ProductDialogComponent, {

      height: 'fit-content',
      minWidth: 'fit-content',

      data: productox,
      scrollStrategy: new NoopScrollStrategy()

    });

    //console.log('Open dialog!');
  }


}






