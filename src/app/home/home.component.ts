import { Component, OnInit, OnDestroy } from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SelectUserService } from '../shared/services/select-user.service';
import { Subscription } from 'rxjs';
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

  coverImagePreviewModal: string;

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

  randMatchScore = [];

  //7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
  ratingNumberObject = { 7: 0.1, 13: 0.2, 16: 0.4, 18: 0.6 };
  ratingNumberCover = [];

  //Genres
  genresCoverImagesKeepWatching = [];
  genresCoverImagesMyList = [];
  genresCoverImagesTopRatedMovies = [];
  genresCoverImagesTvShows = [];

  //Seasons
  numbersOfSeasonsKeepWatching = [];
  numbersOfSeasonsMyList = [];
  numbersOfSeasonsTopRatedMovies = [];
  numbersOfSeasonsTvShows = [];

  season: string;
  episode: string;
  episodeImage: [];

  servicesCode: string = 'Service code';

  displayModal: boolean;
  speakerUpIconShow: boolean = true;

  constructor(
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

    //Setting with random number, the match score
    this.randMatchScore = Array.from({ length: this.coverIndexImgKeepWatching.length }, () => this.getRandomIntBetweenRange(64, 100))

    //setting rating number cover with distribution weight
    this.ratingNumberCover = this.getWeightedRandomNumberInArr(this.ratingNumberObject, 7);

    //Get all cover images by id
    this.getAllCoverImagesById(this.coverIndexImgKeepWatching, this.coverImgKeepWatching)
    this.getAllCoverImagesById(this.coverIndexImgMyList, this.coverImgMyList)
    this.getAllCoverImagesById(this.coverIndexTopRatedMovies, this.coverImgTopRatedMovies)
    this.getAllCoverImagesById(this.coverIndexTvShows, this.coverImgTvShows)

    //Get all genres by id coverImages
    this.getAllGenresById(this.coverIndexImgKeepWatching, this.genresCoverImagesKeepWatching);
    this.getAllGenresById(this.coverIndexImgMyList, this.genresCoverImagesMyList);
    this.getAllGenresById(this.coverIndexTopRatedMovies, this.genresCoverImagesTopRatedMovies);
    this.getAllGenresById(this.coverIndexTvShows, this.genresCoverImagesTvShows);

    //Get all seasons by id coverImages
    this.getAllNumbersOfSeasonsById(this.coverIndexImgKeepWatching, this.numbersOfSeasonsKeepWatching);
    this.getAllNumbersOfSeasonsById(this.coverIndexImgMyList, this.numbersOfSeasonsMyList);
    this.getAllNumbersOfSeasonsById(this.coverIndexTopRatedMovies, this.numbersOfSeasonsTopRatedMovies);
    this.getAllNumbersOfSeasonsById(this.coverIndexTvShows, this.numbersOfSeasonsTvShows);
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();
  }

  getAllCoverImagesById(coverIndexArr: number[], coverBackgroundImages: string[]) {
    for (let i = 0; i < coverIndexArr.length; i++) {
      this.movies.searchImagesMovie(coverIndexArr[i]).pipe(
        map((images) => images.filter((image) => image.type === 'background'))
      ).subscribe(images => {
        //defined rand number in the range of background images
        const randNumbBackgroundImg = this.getRandomInt(images.length);
        //Assign first background image to array
        coverBackgroundImages.push(images[randNumbBackgroundImg].resolutions.original.url);
      })
    }
  }

  getAllGenresById(coverIndexArr: number[], genresCoverImages: any[]) {
    for (let i = 0; i < coverIndexArr.length; i++) {
      this.movies.searchMainInfoMovie(coverIndexArr[i]).pipe(
        map((items) => items.genres)
      ).subscribe(genres => {
        genresCoverImages.push(genres);
      })
    }
  }

  getAllNumbersOfSeasonsById(coverIndexArr: number[], seasonsArr: number[]) {
    for (let i = 0; i < coverIndexArr.length; i++) {
      this.movies.searchNumberSeasonsById(coverIndexArr[i]).subscribe((seasons) => {
        seasonsArr.push(seasons.length);
      })
    }
  }

  showModalDialog(coverImage: any) {
    console.log(coverImage);
    this.coverImagePreviewModal = coverImage;
    this.displayModal = true;
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

  /* Pick a rand number in [0,1) and iterate over the weight specification summing the weights  
    if the random number is less than the sum then return the associated value. 
    */
  getWeightedRandomNumber(objWithWeight: any) {
    var i, sum = 0, r = Math.random();
    for (i in objWithWeight) {
      sum += objWithWeight[i];
      if (r <= sum) return i;
    }
  }

  //Use prevision random algorithm with size
  getWeightedRandomNumberInArr(objWithWeight: any, size: number) {
    let arrWeightedRand = [];
    for (let i = 0; i < size; i++) {
      arrWeightedRand.push(this.getWeightedRandomNumber(objWithWeight))
    }

    return arrWeightedRand;
  }


  getImageMovie(id: number) {
    this.movies.searchImagesMovie(id).pipe(
      map((images) => images.filter((image) => image.type === 'background'))
    ).subscribe(images => {
      this.tempImg = images[0].resolutions.original.url;
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
    return this.movies
      .getEpisodeByNumber(this.movieDetails.id, season, numb)
      .subscribe((episode) => {
        this.detailsEpisode = episode
        this.episodeImage = this.detailsEpisode.image.original
      });
  }

  //Services code
  itemServiceCodeClicked() {
    this.servicesCode = '079-255';
  }

  getCurrentYear() {
    return (new Date()).getFullYear();
  }


  onClickSpeakerIcon(){
    this.speakerUpIconShow = !this.speakerUpIconShow;
  }

  //Configuration SwiperJs
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

    loopedSlides: 7,
    loop: false
  };
}
