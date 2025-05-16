// Componentes
import { Component, Output, EventEmitter, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { AuthService } from '../../../../services/auth.service';

// Modelos
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Usuario } from '../../../../models/Usuario';



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



  // Banderas (boolean)
  beginRegisterProcess: boolean = false;
  existsEmail: boolean = false;
  clickNextButtonValue: boolean = false;
  inputBoolValue: boolean = false;

  // Variables para el formulario (string)
  dialogTitle: string = 'Usar un correo electronico';
  dialogSubtitle: string = 'Comprobaremos si tienes una cuenta y, si no, te ayudaremos a crear una.';
  passwordField: string = 'Contraseña';
  inputFormNameCont: string = 'contrasena';

  // Formulario reactivo
  emailFormGroup: FormGroup;

  // Señales (signal)
  hide = signal(true);
  errorMessageCorreo = signal('');
  errorMessageContrasena = signal('');


  //CMMT EXPLN Output usado para EMITIR evento de click CONTINUAR para cambiar el SWITCH en el padre
  //CMMT EXPLN Se usa el EventEmitter para emitir un evento al padre cuando se hace click en el boton CONTINUAR
  @Output() emailNextButtonCLick = new EventEmitter<Usuario>();

  //CMMT EXPLN Se usa el FormBuilder para crear el formulario reactivo
  //CMMT TO-DO Aplicar AQUI la logica de mediaQuery Service
  //CMMT TO-DO Aplicar AQUI la logica de authService para verificar si el correo existe
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.emailFormGroup = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      contrasena: [
        '',
        [
          Validators.required,
        ]
      ],
      nuevaContrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/)
        ]
      ],
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

  changeFieldValues(value: boolean){



    console.log('CAMBIO DE VALORES', value);
    if (value) {
      this.dialogTitle = 'Iniciar sesión';
      this.dialogSubtitle = 'Ingresa tu correo y contraseña para continuar.';
      this.passwordField = 'Ingresa tu contraseña';
      this.inputFormNameCont = 'contrasena';
    } else {
      this.dialogTitle = 'Crear cuenta';
      this.dialogSubtitle = 'Crea una contraseña para tu cuenta.';
      this.passwordField = 'Crear contraseña';
      this.inputFormNameCont = 'nuevaContrasena';
    }

    // Limpia los errores del control 'correo'
    const passwordControl = this.emailFormGroup.get(this.inputFormNameCont);
    if (passwordControl) {
      passwordControl.setErrors(null); // Elimina los errores existentes
      passwordControl.markAsPristine(); // Opcional: Marca el control como no modificado
      passwordControl.markAsUntouched(); // Opcional: Marca el control como no tocado
    }
  }







  verifyEmail(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.correoExists(this.emailFormGroup.get('correo')?.value).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          //this.existsEmail = true;
          console.log(this.existsEmail);
          resolve(true); // Resuelve la promesa con el valor true
        },
        error: (err) => {
          console.error('Error al verificar el correo:', err);
          //this.existsEmail = false;
          console.log(this.existsEmail);
          resolve(false); // Resuelve la promesa con el valor false
        }
      });
    });
  }

  clickNextButton() {
    console.log('BOTON CORREO APRETADO');
    if(!this.clickNextButtonValue){

      if (!(this.emailFormGroup.get('correo')?.invalid)) {
        this.verifyEmail().then((existsEmail) => {

          // Llama a changeFieldValues con el resultado
          this.changeFieldValues(existsEmail);

          //this.inputBoolValue = true;
          this.clickNextButtonValue = true;
          // Se actualiza después de verificar el correo
        });
      }
    }else{
      //CMMT EXPLN Se envia la informacion al servicio de autenticacion para verificar el correo y la contraseña
      if(this.inputFormNameCont == 'contrasena'){

        //this.emailNextButtonCLick.emit(this.clickNextButtonValue);

      }

      //CMMT EXPLN Se emite el evento al padre para que cambie el switch a la siguiente pantalla
      if(this.inputFormNameCont == 'nuevaContrasena' && !(this.emailFormGroup.get('nuevaContrasena')?.invalid)){
        const usuario = Usuario.fromCorreoYContrasena(
          this.emailFormGroup.get('correo')?.value,
          this.emailFormGroup.get('nuevaContrasena')?.value);
        this.emailNextButtonCLick.emit(usuario);
      }

    }



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
        var emailControl = this.emailFormGroup.get('correo');


        /*
        if (!(this.emailFormGroup.get('correo')?.invalid)) this.inputBoolValue = true;
        else{
          this.clickNextButtonValue = false;
        }
          */
        if (emailControl && emailControl.hasError('required')) {
          //console.log('siquesi REQUIRED');
          this.errorMessageCorreo.set('Tienes que ingresar un valor válido');
        } else if (emailControl && emailControl.hasError('email')) {
          this.errorMessageCorreo.set('No es un correo válido');
          //console.log('siquesi EMAIL');
        } else {
          this.errorMessageCorreo.set('');
        }
        break;

      case 'contrasena':

        console.log('CONTRASENA');
        var passwordControl = this.emailFormGroup.get('contrasena');
        if (passwordControl && passwordControl.hasError('required')) {
          console.log('siquesi REQUIRED');
          this.errorMessageContrasena.set('Tienes que ingresar un valor válido');
        } else {
          this.errorMessageContrasena.set('');
        }
        break;

      case 'nuevaContrasena':
        console.log('NUEVA CONTRASENA UPDATE');
        const newPasswordControl = this.emailFormGroup.get('nuevaContrasena');
        if (newPasswordControl && newPasswordControl.hasError('required')) {
          console.log('siquesi REQUIRED NUEVA CONTRASENA');
          this.errorMessageContrasena.set('Tienes que ingresar un valor válido');
        } else if (newPasswordControl && newPasswordControl.hasError('minlength')) {
          console.log('siquesi MINLENGTH NUEVA CONTRASENA');
          this.errorMessageContrasena.set('La contraseña debe tener al menos 8 caracteres');
        } else if (newPasswordControl && newPasswordControl.hasError('pattern')) {
          console.log('siquesi PATTERN NUEVA CONTRASENA');
          this.errorMessageContrasena.set('La contraseña debe contener al menos un número');
        } else {
          this.errorMessageContrasena.set('');
        }
        break;


    }
  }



  onSubmit() {

  }
}


