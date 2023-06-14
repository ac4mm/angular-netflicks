import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { SelectUserService } from '../shared/services/select-user.service';

@Component({
  selector: 'nf-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  showPassword: boolean = false;
  error: string = null;

  typePassword: any = document.getElementsByClassName('form-control');

  authObs: Observable<AuthResponseData>;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
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

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/browse']);
      },
      (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
    this.destroy$.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
