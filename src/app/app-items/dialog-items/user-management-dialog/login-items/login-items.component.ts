import { Component, Output, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login-items',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIcon,
    GoogleSigninButtonModule
  ],
  templateUrl: './login-items.component.html',
  styleUrl: './login-items.component.scss'
})
export class LoginItemsComponent {
  @Output() emailButtonCLick = new EventEmitter<boolean>();
  valueEmail: boolean = false;

  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  // ...existing code...
  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      //console.log(user)
      //perform further logics
    });
  }
  // ...existing code...

  clickButton() {
    this.valueEmail = true;
    ////console.log('CORREO APRETADO');
    this.emailButtonCLick.emit(this.valueEmail);
  }

  snackBarCasesManager(value: boolean) {
    if (value) {
      this._snackBar.open('Bienvenido de nuevo', '✅', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.dialog.closeAll();
    } else {
      this._snackBar.open('Error al iniciar sesion con Google', '❌', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.dialog.closeAll();
    }

  }

  /*
    loginWithGoogle() {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
        // Aquí puedes manejar el usuario autenticado
        //console.log('Usuario autenticado con Google:', user);
        // Puedes emitir un evento o llamar a un servicio backend con el token
      }).catch(err => {
        console.error('Error en login con Google:', err);
      });
    }
  */
  onGoogleSignIn(user: any) {
    if (user && user.provider && user.email) {
      // Es un SocialUser válido
      //console.log('Usuario autenticado con Google:', user);
      this.snackBarCasesManager(true);
    } else {
      console.error('No se recibió un SocialUser válido:', user);
      this.snackBarCasesManager(false);
    }
  }

}

