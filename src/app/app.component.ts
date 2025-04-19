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


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,
    MatFormFieldModule, MatIconModule, MatInputModule,
    MatButtonModule, MatMenuModule, FooterItemComponent,
    NavItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  title = 'sendbol_streaming';

  
}
