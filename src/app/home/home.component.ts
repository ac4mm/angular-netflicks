import { Component, OnInit, OnDestroy } from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SelectUserService } from '../shared/services/select-user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MoviesService } from '../shared/services/movies.service';
import { map } from 'rxjs/operators';

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

  //Cover image for every rows
  coverImgKeepWatching: string[] = [];
  coverImgMyList: string[] = [];
  coverImgTopRatedMovies: string[] = [];
  coverImgTvShows: string[] = [];

  //Araay index images
  coverIndexImgKeepWatching = [];
  coverIndexImgMyList = [];
  coverIndexTopRatedMovies = [];
  coverIndexTvShows = [];

  randMathScore = [];

  //7+ Kids, 13+ teenagers, 16+, 18+ adults
  ratingNumber = [7, 13, 16, 18]

  //Genres
  genresCoverImages = [];

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

    /*Index of: Rick and morty,Stranger Things,Dark, Lost, Casa de Papel, You, Squid Game */
    this.coverIndexImgKeepWatching = [216, 2993, 17861, 123, 27436, 26856, 43687];

    /*Index of: Better Call Saul, Black Mirror,13 Reasons Why, 1899, BoJack Horseman,MINDHUNTER, How to Sell Drugs Online (Fast) */
    this.coverIndexImgMyList = [618, 305, 7194, 39749, 184, 10822, 39319];

    /* Index of:The Queen's Gambit, The Big Bang Theory, Snowpiercer, The Last of Us, Our Planet, House of the Dragon, Manifest */
    this.coverIndexTopRatedMovies = [41428, 66, 23030, 46562, 17868, 44778, 31365];

    /* Index of:The Office, Peaky Blinders, Family Guy, Game of Thrones, The Simpsons, Chernobyl, Love, Death & Robots */
    this.coverIndexTvShows = [526, 269, 84, 82, 83, 30770, 40329];

    //Setting with random number, the math score
    this.randMathScore = Array.from({ length: this.coverIndexImgKeepWatching.length }, () => this.getRandomIntBetweenRange(64, 100))


    //Get all genres by id coverImages
    this.getAllGenresFromIndex(this.coverIndexImgKeepWatching, this.genresCoverImages)

    //Get all images from coverImages
    this.getAllCoverFromIndexImages(this.coverIndexImgKeepWatching, this.coverImgKeepWatching)
    this.getAllCoverFromIndexImages(this.coverIndexImgMyList, this.coverImgMyList)
    this.getAllCoverFromIndexImages(this.coverIndexTopRatedMovies, this.coverImgTopRatedMovies)
    this.getAllCoverFromIndexImages(this.coverIndexTvShows, this.coverImgTvShows)
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();
  }

  getAllCoverFromIndexImages(coverIndexArr: number[], coverBackgroundImages: string[]) {
    for (let i = 0; i < coverIndexArr.length; i++) {
      this.getImageMovieById(coverIndexArr[i], coverBackgroundImages);
    }
  }

  getAllGenresFromIndex(coverIndexArr: number[], genresCoverImages: any[]) {
    for (let i = 0; i < coverIndexArr.length; i++) {
      this.getGenresById(coverIndexArr[i], genresCoverImages);
    }
  }


  /* UTILITIES */
  //Getting a random integer
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  //Getting a random integer between two values, inclusive
  getRandomIntBetweenRange(min = 0, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomRatingNumberFromArray(arr: any[]) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    return arr[randomIndex];
  }

  getRandomNumberFromArray(arr: any[]) {
    // Shuffle array
    const shuffled = arr.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, arr.length);
  }


  getImageMovie(id: number) {
    this.movies.searchImagesMovie(id).pipe(
      map((images) => images.filter((image) => image.type === 'background'))
    ).subscribe(images => {
      this.tempImg = images[0].resolutions.original.url;
      this.coverImages.push(this.tempImg);
    })
  }

  getImageMovieById(id: number, arr: string[]) {
    this.movies.searchImagesMovie(id).pipe(
      map((images) => images.filter((image) => image.type === 'background'))
    ).subscribe(images => {
      //defined rand number in the range of background images
      const randNumbBackgroundImg = this.getRandomInt(images.length);
      //Assign first background image to array
      arr.push(images[randNumbBackgroundImg].resolutions.original.url);
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

  getGenresById(id: number, arr: any[]) {
    this.movies.searchMainInfoMovie(id).pipe(
      map((items) => items.genres)
    ).subscribe(genres => {
      arr.push(genres);
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

  //Configuration SwiperJs
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
