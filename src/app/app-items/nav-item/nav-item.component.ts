import { Component, Input, ViewChild, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
//CMMT: Importacion de servicios
import { MediaQueryService } from '../../services/media-query.service';
import { Breakpoints } from '@angular/cdk/layout';


import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import { UserManagementDialogComponent } from '../dialog-item/user-management-dialog/user-management-dialog.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

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
    MatIconModule,
    ButtonModule,
    InputGroupAddonModule,
    InputTextModule,
    MenuModule
  ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  constructor(
    private mediaQueryService: MediaQueryService,
  ) {}

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(
      UserManagementDialogComponent,
      {

        minHeight: 'fit-content',
        //minHeight: '40vh',
        minWidth: '40vw',
        scrollStrategy: new NoopScrollStrategy()
      }
    );
  }
 @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;


  someMethod( bool: boolean ) {
    if (this.trigger) {
      if (bool) {
        this.trigger.openMenu();
      } else {
        this.trigger.closeMenu();
      }
    }
  }

  @Input()
  breakpoints = Breakpoints;
  currentBreakpoint?: string;
  currentWidth?: string;


  ngOnInit() {

    this.mediaQueryService.breakpoint$.subscribe(() => {
      this.mediaQueryService.triggerProcesses();
      this.currentBreakpoint = this.mediaQueryService.returnBreakpoint();
    });


    this.currentWidth = this.mediaQueryService.returnWidth();


    //console.log(this.constantes.IMGBAN001);
  }
}
