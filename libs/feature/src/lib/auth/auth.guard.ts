import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuthenticated = false;
  private destroy$ = new Subject<void>();
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    /* return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        console.log('ISAUTH:' + isAuth);
        if (isAuth) {
          return true;
        } else {
          console.log('ISAUTH:' + isAuth);
        }
        return this.router.createUrlTree(['/login']);
      }),
    ); */
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    return this.isAuthenticated;
  }
}