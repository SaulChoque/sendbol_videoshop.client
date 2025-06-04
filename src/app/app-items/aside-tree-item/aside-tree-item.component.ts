import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/Categoria';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Plataforma } from '../../models/Plataforma';
import { PlataformasService } from '../../services/plataformas.service';
import { SvgIconComponent } from '../../canvas/svg-icon/svg-icon.component';
@Component({
  selector: 'app-aside-tree-item',
  imports: [
    MatSliderModule,
    FormsModule,
    MatSelect,
    MatOption,
    MatFormField,
    MatCheckboxModule,
    SvgIconComponent

  ],
  templateUrl: './aside-tree-item.component.html',
  styleUrl: './aside-tree-item.component.scss'
})
export class AsideTreeItemComponent implements OnInit {
  valueEnd: number = 100;
  valueStart: number = 0;
  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private plataformasService: PlataformasService
  ) {}

  @Output()
  categoriaSeleccionada = new EventEmitter<string>();
  @Output()
  plataformaSeleccionada = new EventEmitter<string>();
  @Output()
  precioCambiado = new EventEmitter<{ min: number, max: number }>();


  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
    this.plataformasService.obtenerPlataformas().subscribe((plataformas: Plataforma[]) => {
      this.plataformas = plataformas;
    });
  }

  onCategoriaChange(categoriaId: string) {
    this.categoriaSeleccionada.emit(categoriaId);
  }

  onPlataformaChange(plataformaId: string) {
    this.plataformaSeleccionada.emit(plataformaId);
  }

  onPrecioChange() {
    this.precioCambiado.emit({ min: this.valueStart, max: this.valueEnd });
  }


}
