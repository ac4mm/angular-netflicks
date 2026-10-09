import { UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService = inject(AuthService);

  canActivate(): boolean | UrlTree {
    return !!this.authService.user();
  }
}
