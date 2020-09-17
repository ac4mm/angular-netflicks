import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        console.log('ISAUTH:' + isAuth);
        if (isAuth) {
          return true;
        } else {
          console.log('else case');
        }
        console.log('ISAUTH:' + isAuth);
        return this.router.createUrlTree(['/login']);
      })
      /* tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      }) */
    );
  }
}
