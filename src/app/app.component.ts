import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';


//CMMT EXPLN 1: Importar los componentes que se van a usar en el template
import {Inject, OnInit, inject} from '@angular/core';

import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';





//CMMT: Importacion de componentes
import { FooterItemComponent } from './app-items/footer-item/footer-item.component';
import { NavItemComponent } from './app-items/nav-item/nav-item.component';
import { PlataformasService } from './services/plataformas.service';
import { ChiptagsService } from './services/chiptags.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,
    MatFormFieldModule, MatIconModule, MatInputModule,
    MatButtonModule, MatMenuModule, FooterItemComponent,
    NavItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // Use dependency injection in the constructor
  constructor(
    private plataformaService: PlataformasService,
    private chiptagService: ChiptagsService
  ) {}

  title = 'sendbol_streaming';

  ngOnInit(): void {
    this.plataformaService.obtenerPlataformas().subscribe();
    this.chiptagService.obtenerChiptags().subscribe();
    //this.plataformaService.obtenerPlataformas().subscribe(plataformas => {
    //  this.plataformas = plataformas;
    //});
  }
}
