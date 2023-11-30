import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: AuthComponent },
  { path: '**', redirectTo: '/not-found' },
];
