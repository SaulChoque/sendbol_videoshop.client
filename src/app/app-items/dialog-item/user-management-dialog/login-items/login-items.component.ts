import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-items',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './login-items.component.html',
  styleUrl: './login-items.component.scss'
})
export class LoginItemsComponent {
  @Output() emailButtonCLick = new EventEmitter<boolean>();
  valueEmail: boolean = false;

  clickButton() {
    this.valueEmail= true;
    //console.log('CORREO APRETADO');
    this.emailButtonCLick.emit(this.valueEmail);
  }
}

