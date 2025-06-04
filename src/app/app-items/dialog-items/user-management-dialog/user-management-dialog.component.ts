import { Component, inject } from '@angular/core';
import {
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

import { LoginItemsComponent } from './login-items/login-items.component';
import { EmailCheckItemsComponent } from './email-check-items/email-check-items.component';
import { RegisterItemsComponent } from './register-items/register-items.component';
import { Usuario } from '../../../models/Usuario';
import { FinishReloadItemComponent } from '../../snackbar-item/finish-reload-item/finish-reload-item.component';
import { left, start } from '@popperjs/core';
import {MatDialog} from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-user-management-dialog',
  imports: [
    MatDialogContent,
    MatButtonModule,
    LoginItemsComponent,
    EmailCheckItemsComponent,
    RegisterItemsComponent,

  ],
  templateUrl: './user-management-dialog.component.html',
  styleUrl: './user-management-dialog.component.scss'
})
export class UserManagementDialogComponent {
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  usuario?: Usuario;

  constructor(
    private storageService: StorageService
  ) {}
  condition =  -1;


  getDialogImageUrl(filename: string) {
    const basicUrl = 'images/login/'
    return this.storageService.getImageUrl(basicUrl+filename);
  }

  changePage(index: number) {
    //console.log('apretado PADRECOMPONENT');
    this.condition = index;

  }


  recieveData(value: Usuario, index: number) {
    this.usuario = value;
    this.changePage(index);
  }

  sendButtonFinalClick(value: boolean) {
    this._snackBar.openFromComponent(
      FinishReloadItemComponent,
      {
        duration: 200000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      }
    );
    this.dialog.closeAll();

  }
}
