import { Component, OnInit, OnDestroy } from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SelectUserService } from '../shared/select-user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isValidUser: boolean = false;
  private authServiceSub: Subscription;
  private selectUserSub: Subscription;

  movieDetails: any;
  detailsEpisode: any;
  imagesMovies: [];
  coverImages: string[] = [];
  tempImg: string;

  season: string;
  episode: string;
  episodeImage: [];

  constructor(
    private authService: AuthService,
    public selectUser: SelectUserService,
    private movies: MoviesService
  ) { }

  ngOnInit(): void {
    this.selectUserSub = this.selectUser.currentState.subscribe(
      (state) => (this.isValidUser = !!state)
    );
    /* console.log('HomeComp: ' + this.isValidUser); */
    this.getImageMovie(216);
    this.getImageMovie(2993);
    this.getImageMovie(169);
    this.getImageMovie(17861);
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();
  }

  /* filter by type=== background */
  getImageMovie(id: number) {
    this.movies.searchImagesMovie(id).subscribe(images => {
      this.tempImg = images[3].resolutions.original.url;
      this.coverImages.push(this.tempImg);
    })
  }

  getIdMovie(id: string) {
    this.movies.getMovies(id).subscribe(movie => {
      this.movieDetails = movie;
    })
  }

  searchMovie(query: string) {
    this.movies.searchMovie(query).subscribe(movie => {
      this.movieDetails = movie;
    })
  }

  getEpisode(season: string, numb: string) {
    /* console.log('season:' + this.season + ', episode:' + this.episode); */
    return this.movies
      .getEpisodeByNumber(this.movieDetails.id, season, numb)
      .subscribe((episode) => {
        this.detailsEpisode = episode
        this.episodeImage = this.detailsEpisode.image.original
      });
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
