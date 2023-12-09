import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class AuthServiceMock {
  //TODO to implement
  signup(email: string, password: string) {
    return of(null);
  }

  //TODO to implement
  login(email: string, password: string) {
    return of(null);
  }

  //TODO to implement
  autologin() {}

  //TODO to implement
  logout() {}

  //TODO to implement
  autoLogout(expirationDuration: number) {}

  //TODO to implement
  handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {}

  //TODO to implement
  handleError(error: HttpErrorResponse) {
    return of(null);
  }

  checkCookieUserData() {}
}
