import { Routes } from '@angular/router';
import { isLoggedGuard } from './home/guards/is-logged.guard';
import { hasTokenGuard } from './auth/guards/has-token.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate:[isLoggedGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth-page.component').then((m) => m.AuthPageComponent),
    canActivate:[hasTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
