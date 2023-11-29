import { Component, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from '../services/auth.service';
import { LoadingSpinnerComponent } from '@shared/netflicks';
import { NgIf } from '@angular/common';

@Component({
  selector: 'nf-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [NgIf, LoadingSpinnerComponent, FormsModule],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  showPassword = false;
  error: string;

  authObs: Observable<AuthResponseData>;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

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

    this.authObs.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => undefined,
      error: (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.router.navigate(['/browse']);
      },
    });
    form.reset();
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
    this.destroy$.unsubscribe();
  }
}
