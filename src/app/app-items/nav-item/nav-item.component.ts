import { Component, Input, ViewChild, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/Usuario';
import { MediaQueryService } from '../../services/media-query.service';
import { Breakpoints } from '@angular/cdk/layout';
import { Categoria } from '../../models/Categoria';
import { CategoriasService } from '../../services/categorias.service';
import { MatCardModule } from '@angular/material/card';

import { UserManagementDialogComponent } from '../dialog-items/user-management-dialog/user-management-dialog.component';
import { UploadProductDialogComponent } from '../dialog-items/upload-product-dialog/upload-product-dialog.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav-item',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent implements OnInit {

  usuarioEnSesion?: Usuario;
  usuarioExists = false;
  currentBreakpoint?: string;
  currentWidth?: string;
  categorias: Categoria[] = [];


    // En tu componente
  busqueda: string = '';

  @Input() breakpoints = Breakpoints;
//  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  readonly dialog = inject(MatDialog);

  constructor(
    private mediaQueryService: MediaQueryService,
    private authService: AuthService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.mediaQueryService.breakpoint$.subscribe(() => {
      this.mediaQueryService.triggerProcesses();
      this.currentBreakpoint = this.mediaQueryService.returnBreakpoint();
    });

    this.currentWidth = this.mediaQueryService.returnWidth();

    this.categoriasService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    // ...existing code...
    this.authService.getSessionUser().subscribe({
      next: (usuario) => {
        this.usuarioEnSesion = usuario as Usuario;
        console.log('Usuario en sesión:', this.usuarioEnSesion);
        this.usuarioExists = true;
      },
      error: () => {
        console.error('Error al obtener el usuario en sesión');
        this.usuarioEnSesion = undefined;
        this.usuarioExists = false;
      }
    });
    // ...existing code...
  }

  openDialog(dialogType: string) {
    switch (dialogType) {
      case 'userManagement':
        this.dialog.open(
          UserManagementDialogComponent,
          {
            minHeight: 'fit-content',
            minWidth: '40vw',
            scrollStrategy: new NoopScrollStrategy()
          }
        );
        break;
      case 'upload':
        this.dialog.open(
          UploadProductDialogComponent,
          {
            minHeight: '40vh',
            minWidth: '40vw',
            scrollStrategy: new NoopScrollStrategy()
          }
        );
        break;

    }
  }

  realizarBusqueda(busqueda: string) {

  }
/*
  someMethod(bool: boolean) {
    if (this.trigger) {
      if (bool) {
        this.trigger.openMenu();
      } else {
        this.trigger.closeMenu();
      }
    }
  }
    */
}
