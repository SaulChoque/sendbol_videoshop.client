import { Component, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-email-check-items',
  imports: [
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './email-check-items.component.html',
  styleUrl: './email-check-items.component.scss'
})
export class EmailCheckItemsComponent {
  @Output() emailNextButtonCLick = new EventEmitter<boolean>();
  valueEmail: boolean = false;

  clickNextButton() {
    this.valueEmail= true;
    //console.log('CORREO APRETADO');
    this.emailNextButtonCLick.emit(this.valueEmail);
  }
}


