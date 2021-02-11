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
import { SelectUserService } from '../shared/select-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
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
    private statusUser: SelectUserService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      //console.log(!user);
      console.log(!!user);
    });
    console.log('isAuthenticated:' + this.isAuthenticated);

    this.statusUserSub = this.statusUser.currentState.subscribe(
      (state) => (this.isValidUser = !!state)
    );
    console.log('NavbarComp: ' + this.isValidUser);

    this.idUserSub = this.statusUser.currentId.subscribe(
      (id) => (this.idUserMaster = id)
    );
    console.log('NavbarComp id:' + this.idUserMaster);
  }

  activateSearch() {
    this.searchBox[0].classList.toggle('active');
    console.log('you touch me');
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

  /* @HostListener('document:click', ['$event'])
  clickEvent(event: Event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      this.searchBox[0].classList.toggle('active');
      console.log('clicked inside');
    } else {
      this.searchBox[0].classList.remove('active');
      console.log('clicked outside');
    }
  } */

  onLogout() {
    this.authService.logout();
    this.statusUser.logoutState();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.statusUserSub.unsubscribe();
    this.statusUser.currState();
    this.idUserSub.unsubscribe();
  }

  onChangeUser(idUser: number) {
    this.statusUser.changeIdUser(idUser);
    this.statusUser.setStateUser();
    console.log('changed in profile gate to:' + idUser);
  }
}
