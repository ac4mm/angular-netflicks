import { Component, OnInit, HostListener, OnDestroy, ElementRef, inject } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '@core/auth';
import { SelectUserService } from '@shared/netflicks';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe, NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'nf-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    NgOptimizedImage,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private elRef = inject(ElementRef);
  private authService = inject(AuthService);
  private selectUser = inject(SelectUserService);
  router = inject(Router);

  isAuthenticated = false;
  public isValidUser = false;
  public idUserMaster: number | undefined;

  private userSub: Subscription | undefined;
  private statusUserSub: Subscription | undefined;
  private idUserSub: Subscription | undefined;

  private destroy$ = new Subject<void>();

  searchBox: HTMLCollectionOf<Element> =
    document.getElementsByClassName('search-box');

  ngOnInit(): void {
    this.userSub = this.authService.user$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.statusUserSub = this.selectUser.currentState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.isValidUser = !!state));

    this.idUserSub = this.selectUser.currentId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => (this.idUserMaster = id));
  }

  activateSearchbar() {
    this.searchBox[0].classList.toggle('active');
  }

  @HostListener('document:click', ['$event'])
  clickoutSearchbar(event: { target: MouseEvent }) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      this.searchBox[0]?.classList?.value.includes('active')
    ) {
      this.activateSearchbar();
    }
  }

  @HostListener('window:scroll')
  scrollNavBarEffect() {
    const navbarElement = document.querySelector('.navbar');
    if (!!navbarElement && window.pageYOffset > navbarElement.clientHeight) {
      navbarElement?.classList.add('navbar-scrolled');
    } else {
      navbarElement?.classList.remove('navbar-scrolled');
    }
  }

  onLogout() {
    this.authService.logout();
    this.selectUser.logoutState();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.statusUserSub?.unsubscribe();
    this.selectUser.currState();
    this.idUserSub?.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeUser(idUser: number) {
    this.selectUser.changeIdUser(idUser);
    this.selectUser.setStateUser();
  }
}
