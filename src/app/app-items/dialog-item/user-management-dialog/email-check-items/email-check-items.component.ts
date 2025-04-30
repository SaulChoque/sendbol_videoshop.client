import { Component, Output, EventEmitter, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { merge } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-email-check-items',
  imports: [
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule

  ],
  templateUrl: './email-check-items.component.html',
  styleUrl: './email-check-items.component.scss'
})
export class EmailCheckItemsComponent {

  beginRegisterProcess: boolean = false;
  existsEmail: boolean = false;
  clickNextButtonValue: boolean = false;

  passwordField: String = 'Contraseña';
  emailFormGroup: FormGroup;

  hide = signal(true);


  errorMessageCorreo = signal('');



  //CMMT EXPLN Output usado para EMITIR evento de click CONTINUAR para cambiar el SWITCH en el padre
  //CMMT EXPLN Se usa el EventEmitter para emitir un evento al padre cuando se hace click en el boton CONTINUAR
  @Output() emailNextButtonCLick = new EventEmitter<boolean>();

  //CMMT EXPLN Se usa el FormBuilder para crear el formulario reactivo
  //CMMT TO-DO Aplicar AQUI la logica de mediaQuery Service
  //CMMT TO-DO Aplicar AQUI la logica de authService para verificar si el correo existe
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.emailFormGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });

    //CMMT EXPLN Combina los observables de cambios de estado (statusChanges) y cambios de valor (valueChanges) del control 'correo'.
    //CMMT EXPLN Esto permite reaccionar tanto a validaciones como a modificaciones en el campo de correo electrónico.
    // Combina los observables de cambios de estado (statusChanges) y cambios de valor (valueChanges)
    // de los controles 'correo' y 'contrasena' del formulario reactivo.
    // Esto permite reaccionar tanto a validaciones como a modificaciones en ambos campos.
    merge(
      this.emailFormGroup.get('correo')!.statusChanges,
      this.emailFormGroup.get('correo')!.valueChanges,
      this.emailFormGroup.get('contrasena')!.statusChanges,
      this.emailFormGroup.get('contrasena')!.valueChanges
    )
    //CMMT EXPLN Utiliza el operador takeUntilDestroyed para limpiar la suscripción automáticamente
    // cuando el componente se destruya, evitando fugas de memoria.
    .pipe(takeUntilDestroyed())
    //CMMT EXPLN Se suscribe a los cambios y llama a la función updateErrorMessage para actualizar
    // los mensajes de error según sea necesario.
    .subscribe(() => this.updateErrorMessage(""));
  }



  clickNextButton() {
    //this.beginRegisterProcess= true;
    this.clickNextButtonValue = true;

    this.authService.correoExists(this.emailFormGroup.get('correo')?.value).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.existsEmail = true;

      },
      error: (err) => {
        console.error('Error al verificar el correo:', err);
        this.existsEmail = false;
      }
    });
    //console.log('CORREO APRETADO');
    //this.emailNextButtonCLick.emit(this.beginRegisterProcess);
  }




  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  //CMMT EXPLN Funcion para actualizar el mensaje de error dependiendo del tipo de error
  //CMMT EXPLN Se usa el FormGroup para obtener el control del formulario y validar los errores
  updateErrorMessage(tipo: String) {

    switch(tipo){
      case 'correo':
        const emailControl = this.emailFormGroup.get('correo');
        if (emailControl && emailControl.hasError('required')) {
          console.log('siquesi REQUIRED');
          this.errorMessageCorreo.set('Tienes que ingresar un valor válido');
        } else if (emailControl && emailControl.hasError('email')) {
          this.errorMessageCorreo.set('No es un correo válido');
          console.log('siquesi EMAIL');
        } else {
          this.errorMessageCorreo.set('');
        }
        break;

    }
  }



  onSubmit() {

  }
}


