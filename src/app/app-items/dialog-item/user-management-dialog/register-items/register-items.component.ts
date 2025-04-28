import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-items',
  imports: [
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'es-US'},],
  templateUrl: './register-items.component.html',
  styleUrl: './register-items.component.scss'
})
export class RegisterItemsComponent {
  Countrys: Country[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}

