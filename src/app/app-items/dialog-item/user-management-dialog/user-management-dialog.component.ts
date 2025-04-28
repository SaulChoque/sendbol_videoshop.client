import { Component, model } from '@angular/core';
import {
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


import { LoginItemsComponent } from './login-items/login-items.component';
import { EmailCheckItemsComponent } from './email-check-items/email-check-items.component';
import { RegisterItemsComponent } from './register-items/register-items.component';
@Component({
  selector: 'app-user-management-dialog',
  imports: [
    MatDialogContent,
    MatButtonModule,
    LoginItemsComponent,
    EmailCheckItemsComponent,
    RegisterItemsComponent
  ],
  templateUrl: './user-management-dialog.component.html',
  styleUrl: './user-management-dialog.component.scss'
})
export class UserManagementDialogComponent {
  constructor() {
  }
  condition =  -1;

  changePage(value: boolean, index: number) {
    //console.log('apretado PADRECOMPONENT');
    if(value){
      this.condition = index;
      //console.log('INDEX', index);
    }

  }
}
