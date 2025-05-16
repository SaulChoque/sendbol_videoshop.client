import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../../models/Usuario';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

import { CountryService, Country } from '../../../../services/country.service';
@Component({
  selector: 'app-register-items',
  imports: [
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,

  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-US' },],
  templateUrl: './register-items.component.html',
  styleUrl: './register-items.component.scss'
})
export class RegisterItemsComponent {

  @Output() sendButtonClick = new EventEmitter<boolean>();

  //Formulario reactivo
  registerFormGroup: FormGroup;

  // Lista de países para el mat-select
  countries: Country[] = [];

  @Input({
    required: true,
  })
  usuario?: Usuario;




  //CMMT EXPLN Se usa el FormBuilder para crear el formulario reactivo
  //CMMT TO-DO Aplicar AQUI la logica de mediaQuery Service
  //CMMT TO-DO Aplicar AQUI la logica de authService para subir el usuario a la base de datos
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService) {
    this.registerFormGroup = this.fb.group({
      nombres: [
        '',
        [
          Validators.required,
        ]
      ],
      apellidos: [
        '',
        [
          Validators.required,
        ]
      ],
      pais: [
        '',
        [
          Validators.required,
        ]
      ],
      fechaNacimiento: [
        '',
        [
          Validators.required,
        ]
      ],
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit USUARIO', this.usuario);
    // Llamar al servicio para obtener los países al inicializar el componente
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data; // Asigna los países al arreglo
      },
      error: (err) => {
        console.error('Error al obtener los países:', err);
      },
    });
  }


  sendUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.authService.createUser(this.usuario).subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            //this.existsEmail = true;
            resolve(true); // Resuelve la promesa con el valor true
          },
          error: (err) => {
            console.error('Error al verificar el correo:', err);
            //this.existsEmail = false;
            resolve(false); // Resuelve la promesa con el valor false
          }
        }
        );
      }
    );
  }



  onSubmit() {

    console.log('onSubmit', this.registerFormGroup.value);

    if (this.registerFormGroup.valid && this.usuario) {
      // Aquí puedes realizar la lógica para enviar los datos al servidor
      this.usuario.nombre = this.registerFormGroup.get('nombres')?.value;
      this.usuario.apellido = this.registerFormGroup.get('apellidos')?.value;
      this.usuario.pais = this.registerFormGroup.get('pais')?.value;
      this.usuario.fechaNacimiento = this.registerFormGroup.get('fechaNacimiento')?.value;
      this.usuario.telefono = 1;

      //console.log('Usuario a enviar:', this.usuario);

      this.sendUser().then((existsEmail) => {
        // Llama a changeFieldValues con el resultado
        //this.changeFieldValues(existsEmail);
        //this.inputBoolValue = true;
        // Se actualiza después de verificar el correo
        console.log('Usuario enviado:', this.usuario);
        this.sendButtonClick.emit(true);
      }
      );


    }

  }
}
