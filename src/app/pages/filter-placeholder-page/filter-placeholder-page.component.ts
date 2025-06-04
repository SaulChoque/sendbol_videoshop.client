import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SplitterModule } from 'primeng/splitter';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';


//CMMT Importacion de servicios
import { Breakpoints } from '@angular/cdk/layout';
import { MediaQueryService } from '../../services/media-query.service';
import { AsideTreeItemComponent } from '../../app-items/aside-tree-item/aside-tree-item.component';
import { ChiptagsService } from '../../services/chiptags.service';
import { Chiptag } from '../../models/Chiptag';
import { MatChipsModule } from '@angular/material/chips';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/Producto';
import { CardItemComponent } from '../../app-items/card-item/card-item.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-filter-placeholder-page',
  imports: [
    MatButtonModule,
    SplitterModule,
    AsideTreeItemComponent,
    MatChipsModule,
    CardItemComponent,
    MatButtonToggleModule,
    MatIcon
  ],
  templateUrl: './filter-placeholder-page.component.html',
  styleUrl: './filter-placeholder-page.component.scss'
})
export class FilterPlaceholderPageComponent {


  showFiller = false;
  chiptags: Chiptag[] = [];
  productos: Producto[] = [];
  categoriaSeleccionada?: string;
  plataformaSeleccionada?: string;
  precioMin?: number;
  precioMax?: number;
  sortBy?: string;


  constructor(
    private mediaQueryService: MediaQueryService,
    private activatedRoute: ActivatedRoute,
    private chiptagsService: ChiptagsService,
    private productosService: ProductosService
  ) { }

  @Input()
  breakpoints = Breakpoints;
  currentBreakpoint?: string;
  currentWidth?: string;

  ngOnInit() {
    AOS.init();
    this.mediaQueryService.breakpoint$.subscribe(() => {
      this.mediaQueryService.triggerProcesses();
      this.currentBreakpoint = this.mediaQueryService.returnBreakpoint();
    });
    //this.chiptagsService.obtenerChiptags().subscribe((chiptags: Chiptag[]) => {
    //  this.chiptags = chiptags;
    //}
    //);
    this.chiptagsService.obtenerChiptags().subscribe((chiptags: Chiptag[]) => {
      this.chiptags = chiptags;
    }
    );

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      // Aquí puedes usar los parámetros id y guid según sea necesario
      switch (id) {
        case "mas-gustado":
          this.sortBy = 'likes';


          // Lógica para "mas-gustado"
          break;
        case "ranking":
          this.sortBy = 'ranking';
          // Lógica para "mejor-calificado"
          break;
        default:
          // Lógica para otros casos o valor por defecto
          break;
      }
      this.aplicarFiltros();


      // Realiza el desplazamiento suave hasta el principio de la página
      this.scrollToTop();
    });


    this.currentWidth = this.mediaQueryService.returnWidth();

  }


  //article = ARTICLES[0];


  Navigate(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  aplicarFiltros() {
    // Construye el objeto de filtros
    const filtros: any = {
      categoria: this.categoriaSeleccionada,
      plataforma: this.plataformaSeleccionada,
      min: this.precioMin,
      max: this.precioMax,
      sortBy: this.sortBy,
      sortOrder: true // true para ascendente, false para descendente
    };

    // Elimina las propiedades que sean undefined
    Object.keys(filtros).forEach(key => {
      if (filtros[key] === undefined) {
        delete filtros[key];
      }
    });

    this.productosService.filtrarProductos(filtros).subscribe(productos => {
      this.productos = productos;
    });
  }


}
