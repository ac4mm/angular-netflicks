import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SelectUserService } from '../shared/services/select-user.service';
import { Subject, Subscription, concatMap, from, map, of, shareReplay, switchMap, take, toArray } from 'rxjs';
import { MoviesService } from '../shared/services/movies.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PreviewModalContainerCover } from 'src/app/home/preview-modal-container-cover/preview-modal-container-cover.component';
import { Observable, takeUntil } from "rxjs";
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { YoutubeService } from 'src/app/shared/services/youtube.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, UtilitiesService]
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

  indexSelectedItem: number;
  coverImagePreviewModal: string;

  selectedIdMainTvMaze: number;

  coverMainImageAndTypography$: Observable<string[]>;

  coverImgKeepWatching$: Observable<string[]>;
  coverImgMyList$: Observable<string[]>;
  coverImgTopRatedMovies$: Observable<string[]>;
  coverImgTvShows$: Observable<string[]>;

  /*Array index images TV Maze  */
  /*Index of: Rick and morty,Stranger Things,Dark, Lost, Casa de Papel, You, Squid Game */
  coverIndexImgKeepWatching: number[] = [216, 2993, 17861, 123, 27436, 26856, 43687];

  /*Index of: Better Call Saul, Black Mirror,13 Reasons Why, 1899, BoJack Horseman,MINDHUNTER, How to Sell Drugs Online (Fast) */
  coverIndexImgMyList: number[] = [618, 305, 7194, 39749, 184, 10822, 39319];

  /* Index of:The Queen's Gambit, The Big Bang Theory, Snowpiercer, The Last of Us, Our Planet, House of the Dragon, Manifest */
  coverIndexTopRatedMovies: number[] = [41428, 66, 23030, 46562, 17868, 44778, 31365];

  /* Index of:The Office, Peaky Blinders, Family Guy, Game of Thrones, The Simpsons, Chernobyl, Love, Death & Robots */
  coverIndexTvShows: number[] = [526, 269, 84, 82, 83, 30770, 40329];

  randMatchScore = [];

  //7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
  ratingNumberObject = { 7: 0.1, 13: 0.2, 16: 0.4, 18: 0.6 };
  ratingNumberCover = [];

  //Genres
  genresCoverImagesKeepWatching$: Observable<string[]>;
  genresCoverImagesMyList$: Observable<string[]>;
  genresCoverImagesTopRatedMovies$: Observable<string[]>;
  genresCoverImagesTvShows$: Observable<string[]>;

  //Seasons
  numbersOfSeasonsKeepWatching$: Observable<string[]>;
  numbersOfSeasonsMyList$: Observable<string[]>;;
  numbersOfSeasonsTopRatedMovies$: Observable<string[]>;;
  numbersOfSeasonsTvShows$: Observable<string[]>;;

  season: string;
  episode: string;
  episodeImage: [];

  servicesCode: string = 'Service code';

  displayModal: boolean;
  checkIconShow: boolean = true;
  speakerUpIconShow: boolean = true;

  customCarretDownIcon = 'pi pi-caret-down';

  private destroy$ = new Subject<void>();

  showVideoPreview: boolean = false;

  srcURLStaticCover: SafeResourceUrl;

  //TESTING
  showVideo = true;
  videoClicked = false;
  playerSettings: any;
  public YT: any;
  public video: any = 'b9EkMc79ZSU';
  public player: any;

  constructor(
    public selectUser: SelectUserService,
    private movies: MoviesService,
    private youtubeService: YoutubeService,
    public dialogService: DialogService,
    private utilitiesService: UtilitiesService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.selectUserSub = this.selectUser.currentState$.pipe(takeUntil(this.destroy$)).subscribe(
      (state) => (this.isValidUser = !!state)
    );

    //Index Stranger Things
    this.selectedIdMainTvMaze = 2993;

    //Setting with random number, the match score
    this.randMatchScore = Array.from({ length: this.coverIndexImgKeepWatching.length }, () => this.utilitiesService.getRandomIntBetweenRange(64, 100))

    //setting rating number cover with distribution weight
    this.ratingNumberCover = this.getWeightedRandomNumberInArr(this.ratingNumberObject, 7);

    this.coverMainImageAndTypography$ = this.getCoverImageAndTypographyById$(this.selectedIdMainTvMaze, 10);

    this.autoplayVideo();

    //Get all cover images by id
    this.coverImgKeepWatching$ = this.getAllCoverImagesById$(this.coverIndexImgKeepWatching);
    this.coverImgMyList$ = this.getAllCoverImagesById$(this.coverIndexImgMyList);
    this.coverImgTopRatedMovies$ = this.getAllCoverImagesById$(this.coverIndexTopRatedMovies);
    this.coverImgTvShows$ = this.getAllCoverImagesById$(this.coverIndexTvShows);

    //Gel all genre by images id
    this.genresCoverImagesKeepWatching$ = this.getAllGenresById$(this.coverIndexImgKeepWatching);
    this.genresCoverImagesMyList$ = this.getAllGenresById$(this.coverIndexImgMyList);
    this.genresCoverImagesTopRatedMovies$ = this.getAllGenresById$(this.coverIndexTopRatedMovies);
    this.genresCoverImagesTvShows$ = this.getAllGenresById$(this.coverIndexTvShows);

    //Number of seasons by id
    this.numbersOfSeasonsKeepWatching$ = this.getAllNumbersOfSeasonsById$(this.coverIndexImgKeepWatching);
    this.numbersOfSeasonsMyList$ = this.getAllNumbersOfSeasonsById$(this.coverIndexImgMyList);
    this.numbersOfSeasonsTopRatedMovies$ = this.getAllNumbersOfSeasonsById$(this.coverIndexTopRatedMovies);
    this.numbersOfSeasonsTvShows$ = this.getAllNumbersOfSeasonsById$(this.coverIndexTvShows);

    this.initScriptIFrame();
  }

  initScriptIFrame() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      height: '100%',
      width: '100%',
      playerVars: {
        autohide: 1,
        controls: 0,
        showinfo: 0,
        autoplay: 1,
        modestbranding: 1,
        disablekb: 1,
        rel: 0,
        fs: 1,
        playsinline: 1,
        loop: 0
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });

  }

  onPlayerReady(event) {
    event.target.playVideo();
    event.target.setPlaybackQuality('hd720');
    console.log(event.target.getPlaybackQuality())
  }

  onPlayerStateChange(event) {
    if (event.data == new window['YT'].PlayerState.BUFFERING) {
      event.target.setPlaybackQuality('hd720');
    }
  }


  autoplayVideo() {
    setTimeout(() => {
      this.showVideoPreview = true;
      /*  this.srcURLStaticCover = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/b9EkMc79ZSU?start=15&autoplay=1&mute=' + +this.speakerUpIconShow + '&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&vq=hd720');
       console.log(this.srcURLStaticCover); */
    }, 2000)
  }


  onClickSpeakerIcon() {
    this.speakerUpIconShow = !this.speakerUpIconShow;
    /*  if(this.srcURLStaticCover){
       this.srcURLStaticCover = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/b9EkMc79ZSU?start=15&autoplay=1&mute=' + +this.speakerUpIconShow + '&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&vq=hd720');  
     } */
    if (this.player.isMuted()) {
      this.player.unMute();
    } else {
      this.player.mute();
    }
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();

    this.destroy$.next();
    this.destroy$.complete();
  }

  getCoverImageAndTypographyById$(coverId: number, indexBackground: number = 0, indexTypography: number = 0): Observable<any[]> {
    let finalCoverTypoImage = [];

    return this.movies.searchImagesMovie(coverId).pipe(
      map((images) => {
        let arr = [];
        arr.push(images.filter((image) => image.type === 'background'));
        arr.push(images.filter((image) => image.type === 'typography'));

        finalCoverTypoImage.push(arr[0][indexBackground]);
        finalCoverTypoImage.push(arr[1][indexTypography]);

        return finalCoverTypoImage;
      }),
    )
  }

  getAllCoverImagesById$(coverIndexImg: number[]): Observable<any[]> {
    let finalCoverImages = [];

    return from(coverIndexImg).pipe(
      concatMap((item) => this.movies.searchImagesMovie(item)),
      map((images) => images.filter((image) => image.type === 'background')),
      switchMap((images) => {
        //defined rand number in the range of background images
        const randNumbBackgroundImg = this.utilitiesService.getRandomInt(images.length);

        //Assign first background image to array
        finalCoverImages.push(images[randNumbBackgroundImg].resolutions.original.url);
        return of(finalCoverImages);
      })
    )
  }

  getAllGenresById$(coverIndexImg: number[]): Observable<any[]> {
    let finalGenreSeasons = [];


    return from(coverIndexImg).pipe(
      concatMap((indexImg) => this.movies.searchMainInfoMovie(indexImg).pipe(map((item) => {
        finalGenreSeasons.push(item.genres);
        return finalGenreSeasons;
      }))),
      shareReplay(1)
    )
  }

  getAllNumbersOfSeasonsById$(coverIndexImg: number[]): Observable<any[]> {
    let finalNumberSeasons = [];

    return from(coverIndexImg).pipe(
      concatMap((indexImg) => this.movies.searchNumberSeasonsById(indexImg).pipe(map((seasons) => {
        finalNumberSeasons.push([seasons.length]);
        return finalNumberSeasons;
      }))),
      shareReplay(1)
    )
  }


  showModalDialog(coverImage: any, index: number) {
    this.indexSelectedItem = index;
    this.coverImagePreviewModal = coverImage;
    this.displayModal = true;
  }

  openDialogCoverImage(coverImage: any, index: number, indexTvMazeSeries: number) {
    this.indexSelectedItem = index;
    this.coverImagePreviewModal = coverImage;

    const dialog: DynamicDialogRef = this.dialogService.open(PreviewModalContainerCover, {
      baseZIndex: 10000,
      modal: true,
      draggable: false,
      dismissableMask: true,
      showHeader: false,
      closeOnEscape: true,
      data: {
        randMatchScore: this.randMatchScore,
        coverImagePreviewModal: this.coverImagePreviewModal,
        indexSelectedItem: this.indexSelectedItem,
        indexTvMazeSeries: indexTvMazeSeries
      }
    })
  }

  //Use prevision random algorithm with size
  getWeightedRandomNumberInArr(objWithWeight: any, size: number) {
    let arrWeightedRand = [];
    for (let i = 0; i < size; i++) {
      arrWeightedRand.push(this.utilitiesService.getWeightedRandomNumber(objWithWeight))
    }

    return arrWeightedRand;
  }


  getImageMovie(id: number) {
    this.movies.searchImagesMovie(id).pipe(
      map((images) => images.filter((image) => image.type === 'background'))
    ).pipe(takeUntil(this.destroy$)).subscribe(images => {
      this.tempImg = images[0].resolutions.original.url;
      this.coverImages.push(this.tempImg);
    })
  }

  getIdMovie(id: string) {
    this.movies.getMovies(id).pipe(takeUntil(this.destroy$)).subscribe(movie => {
      this.movieDetails = movie;
    })
  }

  searchMovie(query: string) {
    this.movies.searchMovie(query).pipe(takeUntil(this.destroy$)).subscribe(movie => {
      this.movieDetails = movie;
    })
  }

  getEpisode(season: string, numb: string) {
    return this.movies
      .getEpisodeByNumber(this.movieDetails.id, season, numb)
      .pipe(takeUntil(this.destroy$))
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

  onClickCheckIcon() {
    this.checkIconShow = !this.checkIconShow;
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
