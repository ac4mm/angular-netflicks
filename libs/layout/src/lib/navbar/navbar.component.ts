import { ChangeDetectionStrategy, computed } from '@angular/core';
import { Component, HostListener, ElementRef, inject } from '@angular/core';
import { AuthService } from '@core/auth';
import { SelectUserService } from '@shared/netflicks';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe, NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class NavbarComponent {
  private elRef = inject(ElementRef);
  private authService = inject(AuthService);
  private selectUser = inject(SelectUserService);
  router = inject(Router);

  isAuthenticated = computed(() => !!this.authService.user());
  isValidUser = this.selectUser.isSelected;
  idUserMaster = this.selectUser.selectedUserId;

  searchBox: HTMLCollectionOf<Element> =
    document.getElementsByClassName('search-box');

  activateSearchbar() {
    this.searchBox[0].classList.toggle('active');
  }

  @HostListener('document:click', ['$event'])
  clickoutSearchbar(event: Event) {
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (
      !this.elRef.nativeElement.contains(target) &&
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

  onChangeUser(idUser: number) {
    this.selectUser.changeIdUser(idUser);
    this.selectUser.setStateUser();
  }
}
