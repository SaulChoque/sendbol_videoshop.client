import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//animations for coreUI https://coreui.io/angular/docs/getting-started/introduction/
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownModule } from '@coreui/angular';

import { SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

//animations for PRIMENG https://primefaces.org/primeng/showcase/#/setup
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import MyPreset from '../styles/primeng.preset';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SocialLoginModule), // <-- Agrega el módulo SocialLoginModule
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId // <-- Usa la variable de entorno, no un string hardcodeado
            )
          }
        ],
        onError: (error: any) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig,
    },
    //CMMT EXPLN Importacion de los temas de primeNG
    providePrimeNG({
      theme: {
        //preset: Aura
        preset: MyPreset
      }
    }),
    importProvidersFrom(DropdownModule),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
