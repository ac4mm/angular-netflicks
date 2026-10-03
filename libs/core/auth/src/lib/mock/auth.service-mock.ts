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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  autologin() {}

  //TODO to implement
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {}

  //TODO to implement
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  autoLogout(expirationDuration: number) {}

  //TODO to implement
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {}

  //TODO to implement
  handleError(error: HttpErrorResponse) {
    return of(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkCookieUserData() {}
}
