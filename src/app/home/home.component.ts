import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SelectUserService } from '../shared/select-user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isValidUser: boolean = false;
  private authServiceSub: Subscription;
  private selectUserSub: Subscription;

  constructor(
    private authService: AuthService,
    private selectUser: SelectUserService
  ) {}

  ngOnInit(): void {
    this.selectUserSub = this.selectUser.currentState.subscribe(
      (state) => (this.isValidUser = !!state)
    );
    console.log('HomeComp: ' + this.isValidUser);
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();
  }

  slideData = [
    {
      id: 1,
      name: 'Avon',
    },
    {
      id: 2,
      name: 'Infrastructures',
    },
    {
      id: 3,
      name: 'Users Cotton',
    },
    {
      id: 4,
      name: 'Haptic Oklahoma Jewelery',
    },
    {
      id: 5,
      name: 'Circles Integration Street',
    },
    {
      id: 6,
      name: 'uniform Communications Tuna',
    },
    {
      id: 7,
      name: 'North Carolina',
    },
    {
      id: 8,
      name: 'Eyeballs Rubber',
    },
    {
      id: 9,
      name: 'Nevada green unleash',
    },
  ];

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },

    allowTouchMove: true,
    updateOnWindowResize: true,
    slidesOffsetBefore: 60,
    slidesOffsetAfter: 130,

    breakpoints: {
      1024: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
      500: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      400: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      300: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    loop: false,
  };
}
