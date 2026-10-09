import { UrlTree } from '@angular/router';
import { inject, Service } from '@angular/core';
import { AuthService } from './auth.service';

@Service()
export class AuthGuard {
  private authService = inject(AuthService);

  canActivate(): boolean | UrlTree {
    return !!this.authService.user();
  }
}
