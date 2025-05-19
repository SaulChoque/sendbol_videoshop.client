import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PRODUCTOS } from '../../models/constants';
import { CardItemComponent } from '../../app-items/card-item/card-item.component';
import { CarouselModule } from 'primeng/carousel';


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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  slides = [
    {
      id: 0,
      src: './assets/images/carrousel/fscrn1fix.webp',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      id: 1,
      src: './assets/images/carrousel/fscrn2fix.webp',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      src: './assets/images/carrousel/fscrn3fix.webp',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  ];

  productos = [...PRODUCTOS];
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

  ngOnInit(): void {
    // Ya no es necesario inicializar slides aquí
  }
}
