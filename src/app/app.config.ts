import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//animations for coreUI https://coreui.io/angular/docs/getting-started/introduction/
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownModule } from '@coreui/angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers:
  [
    importProvidersFrom(DropdownModule),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
