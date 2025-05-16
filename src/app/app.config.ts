import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//animations for coreUI https://coreui.io/angular/docs/getting-started/introduction/
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownModule } from '@coreui/angular';



//animations for PRIMENG https://primefaces.org/primeng/showcase/#/setup
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import MyPreset from '../styles/primeng.preset';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers:
  [


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
