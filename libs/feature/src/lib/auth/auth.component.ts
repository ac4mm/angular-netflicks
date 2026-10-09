import { ChangeDetectionStrategy, signal } from '@angular/core';
import { Component, OnDestroy, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from '@core/services/auth.service';
import { LoadingSpinnerComponent } from '@shared/netflicks';
import { NgOptimizedImage } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nf-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
  imports: [LoadingSpinnerComponent, FormsModule, NgOptimizedImage],
})
export class AuthComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoginMode = signal(true);
  isLoading = signal(false);
  showPassword = signal(false);
  error = signal<string | undefined>(undefined);

  authObs: Observable<AuthResponseData>;
  private destroy$ = new Subject<void>();

  onShowPassword() {
    this.showPassword.update((show) => !show);
  }

  onSwitchMode() {
    this.isLoginMode.update((loginMode) => !loginMode);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading.set(true);
    if (this.isLoginMode()) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => undefined,
      error: (errorMessage) => {
        console.error(errorMessage);
        this.error.set(errorMessage);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
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
