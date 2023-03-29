import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ElementRef,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SelectUserService } from '../shared/services/select-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  public isValidUser: boolean = false;
  public idUserMaster: number;

  private userSub: Subscription;
  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  searchBox: any = document.getElementsByClassName('search-box');

  constructor(
    private elRef: ElementRef,
    private authService: AuthService,
    private selectUser: SelectUserService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.statusUserSub = this.selectUser.currentState.subscribe(
      (state) => (this.isValidUser = !!state)
    );

    this.idUserSub = this.selectUser.currentId.subscribe(
      (id) => (this.idUserMaster = id)
    );
  }

  activateSearch() {
    this.searchBox[0].classList.toggle('active');
  }

  @HostListener('window:scroll', ['$event'])
  scrollNavBarEffect($event) {
    let navbarElement = document.querySelector('.navbar');
    if (window.pageYOffset > navbarElement?.clientHeight) {
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
    this.userSub.unsubscribe();
    this.statusUserSub.unsubscribe();
    this.selectUser.currState();
    this.idUserSub.unsubscribe();
  }

  onChangeUser(idUser: number) {
    this.selectUser.changeIdUser(idUser);
    this.selectUser.setStateUser();
  }
}
