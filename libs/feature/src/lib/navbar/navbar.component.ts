import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SelectUserService } from '@shared/netflicks';

@Component({
  selector: 'nf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  public isValidUser = false;
  public idUserMaster: number | undefined;

  private userSub: Subscription | undefined;
  private statusUserSub: Subscription | undefined;
  private idUserSub: Subscription | undefined;

  private destroy$ = new Subject<void>();

  searchBox: any = document.getElementsByClassName('search-box');

  constructor(
    private elRef: ElementRef,
    private authService: AuthService,
    private selectUser: SelectUserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$
      .pipe(takeUntil(this.destroy$))
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
  clickoutSearchbar(event: { target: any }) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      this.searchBox[0]?.classList?.value.includes('active')
    ) {
      this.activateSearchbar();
    }
  }

  @HostListener('window:scroll', ['$event'])
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
