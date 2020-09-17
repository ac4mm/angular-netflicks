import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { SelectUserService } from '../shared/select-user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  showPassword: boolean = false;
  error: string = null;

  typePassword: any = document.getElementsByClassName('form-control');

  constructor(private authService: AuthService, private router: Router) {
    /* this.isLoginMode = true;
    this.isLoading = false;
    this.showPassword = false;
    this.error = null; */
  }

  ngOnInit(): void {
    //document.body.classList.add('background');
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/browse']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
  }

  onHandleError() {
    this.error = null;
  }
}
