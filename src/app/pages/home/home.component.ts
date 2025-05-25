import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
//import { PRODUCTOS } from '../../models/constants';
import { CardItemComponent } from '../../app-items/card-item/card-item.component';
import { CarouselModule } from 'primeng/carousel';
import { Producto } from '../../models/Producto';
import AOS from 'aos';
//import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..


// import { TagModule } from 'primeng/tag'; // Elimina si no usas <p-tag>
// import { ButtonModule } from 'primeng/button'; // Elimina si no usas <p-button>
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from '@coreui/angular';


import { ProductosService } from '../../services/productos.service'; // Agrega la importación


@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
    MatCardModule,
    MatButtonModule,
    CardItemComponent,
    CarouselModule,
    // TagModule, // Elimina si no usas <p-tag>
    // ButtonModule, // Elimina si no usas <p-button>
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
    console.log('asdasdasdasdasdasd');
    
    AOS.init();
  }


  slides = [
    {
      id: 0,
      src: './assets/images/carrousel/carr1.jpg',
      title: 'Netflix a precio de gallina muerta 🍗',
      subtitle: 'Tenemos los precios mas competitivos en lo que a cuentas respecta 😉.'
    },
    {
      id: 1,
      src: './assets/images/carrousel/carr2.jpg',
      title: 'Las ultimas Keys de Steam 🎮🕹️',
      subtitle: 'No pienses mas y corre por la tuya ⌛⌛.'
    },
    {
      id: 2,
      src: './assets/images/carrousel/carr3.jpg',
      title: 'GTA VI a la vista 👀👀👀👀',
      subtitle: 'Somos distribuidor oficial de la version fisica 💪💪💪.'
    }
  ];






  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 3,
      numScroll: 1
    }
  ];


}
