import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilterPlaceholderPageComponent } from './pages/filter-placeholder-page/filter-placeholder-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
  },
  {
    path: 'filtro/:id',
    component: FilterPlaceholderPageComponent,
    title: 'Filtro',
  },
  {
    path: 'filtrosearch/:id',
    component: FilterPlaceholderPageComponent,
    title: 'Filtro',
  }


];
