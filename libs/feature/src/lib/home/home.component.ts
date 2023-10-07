import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  concatMap,
  from,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import Swiper from 'swiper';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PreviewModalContainerComponent } from './preview-modal-container/preview-modal-container.component';
import {
  ManagePlayerService,
  NfFullscreenLogoComponent,
  NfFullscreenPlayerComponent,
  SelectUserService,
  TheMovieDBService,
  TvMazeService,
  UtilitiesService,
} from '@shared/netflicks';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'nf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, UtilitiesService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isValidUser = false;
  private selectUserSub: Subscription;

  indexSelectedItem: number;
  coverImagePreviewModal: string;

  selectedIdMainTvMaze: number;
  selectedIdMainTMDB: number;

  coverMainImageAndTypography$: Observable<string[]>;

  coverImgKeepWatching$: Observable<string[]>;
  coverImgMyList$: Observable<string[]>;
  coverImgTopRatedMovies$: Observable<string[]>;
  coverImgTvShows$: Observable<string[]>;

  /*Array index images TV Maze  */
  /*Index of: Rick and morty,Stranger Things,Dark, Lost, Casa de Papel, You, Squid Game */
  coverIndexImgKeepWatching: number[] = [
    216, 2993, 17861, 123, 27436, 26856, 43687,
  ];
  /*Array index images ThemovieDb  */
  coverIndexImgKeepWatchingTMDB: number[] = [
    60625, 66732, 70523, 4607, 71446, 78191, 93405,
  ];

  /*Index of: Better Call Saul, Black Mirror,13 Reasons Why, 1899, BoJack Horseman,MINDHUNTER, How to Sell Drugs Online (Fast) */
  coverIndexImgMyList: number[] = [618, 305, 7194, 39749, 184, 10822, 39319];
  /*Array index images ThemovieDb  */
  coverIndexImgMyListTMDB: number[] = [
    60059, 42009, 66788, 90669, 61222, 67744, 88236,
  ];

  /* Index of:The Queen's Gambit, The Big Bang Theory, Snowpiercer, The Last of Us, Our Planet, House of the Dragon, Manifest */
  coverIndexTopRatedMovies: number[] = [
    41428, 66, 23030, 46562, 17868, 44778, 31365,
  ];
  /*Array index images ThemovieDb  */
  coverIndexTopRatedMoviesTMDB: number[] = [
    87739, 1418, 79680, 100088, 83880, 94997, 79696,
  ];

  /* Index of:The Office, Peaky Blinders, Family Guy, Game of Thrones, The Simpsons, Chernobyl, Love, Death & Robots */
  coverIndexTvShows: number[] = [526, 269, 84, 82, 83, 30770, 40329];
  /*Array index images ThemovieDb  */
  coverIndexTvShowsTMDB: number[] = [
    2316, 60574, 1434, 1399, 456, 87108, 86831,
  ];

  randMatchScore: number[] = [];

  //7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
  ratingNumberObject = { 7: 0.1, 13: 0.2, 16: 0.4, 18: 0.6 };
  ratingNumberCover: (string | undefined)[] = [];

  //Logos
  logoImagesKeepWatching$: Observable<string[]>;
  logoImagesMyList$: Observable<string[]>;
  logoImagesTopRatedMovies$: Observable<string[]>;
  logoImagesTvShows$: Observable<string[]>;

  //Genres
  genresCoverImagesKeepWatching$: Observable<string[]>;
  genresCoverImagesMyList$: Observable<string[]>;
  genresCoverImagesTopRatedMovies$: Observable<string[]>;
  genresCoverImagesTvShows$: Observable<string[]>;

  //Seasons
  numbersOfSeasonsKeepWatching$: Observable<string[]>;
  numbersOfSeasonsMyList$: Observable<string[]>;
  numbersOfSeasonsTopRatedMovies$: Observable<string[]>;
  numbersOfSeasonsTvShows$: Observable<string[]>;

  showSpeakerUpIcon = true;
  showRefreshIcon = false;

  mainMaturityRating: number;

  private destroy$ = new Subject<void>();

  //Utils player Youtube video
  showVideoPreview = false;

  @ViewChild('player') player: any;
  keyYTVideo: string;
  playerVars: {
    autohide: 1;
    controls: 0;
    showinfo: 0;
    autoplay: 1;
    modestbranding: 1;
    disablekb: 1;
    rel: 0;
    fs: 0;
    playsinline: 1;
    loop: 1;
    allowfullscreen: 1;
    frameBorder: 0;
  };

  constructor(
    private authService: AuthService,
    public selectUser: SelectUserService,
    private tvmazeService: TvMazeService,
    public dialogService: DialogService,
    private utilitiesService: UtilitiesService,
    public themoviedbService: TheMovieDBService,
    private managePlayerService: ManagePlayerService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    //id YT video Stranger Things
    this.keyYTVideo = 'b9EkMc79ZSU';
  }

  ngOnInit(): void {
    this.authService.checkCookieUserData();

    this.selectUserSub = this.selectUser.currentState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.isValidUser = state;

        if (this.isValidUser) {
          this.renderer.removeStyle(document.body, 'overflow-y');
          this.autoplayVideo();

          setTimeout(() => {
            this.initializeSwiper();
          });
        }
      });

    //Index Stranger Things
    this.selectedIdMainTvMaze = 2993;
    this.selectedIdMainTMDB = 66732;

    //Setting with random number, the match score
    this.randMatchScore = Array.from(
      { length: this.coverIndexImgKeepWatching.length },
      () => this.utilitiesService.getRandomIntBetweenRange(64, 100)
    );

    //setting rating number cover with distribution weight
    this.ratingNumberCover = this.getWeightedRandomNumberInArr(
      this.ratingNumberObject,
      7
    );

    this.coverMainImageAndTypography$ = this.getCoverImageAndTypographyById$(
      this.selectedIdMainTvMaze,
      10
    );

    //Get all cover images by id (TvMaze)
    this.coverImgKeepWatching$ = this.getAllCoverImagesById$(
      this.coverIndexImgKeepWatching
    );
    this.coverImgMyList$ = this.getAllCoverImagesById$(
      this.coverIndexImgMyList
    );
    this.coverImgTopRatedMovies$ = this.getAllCoverImagesById$(
      this.coverIndexTopRatedMovies
    );
    this.coverImgTvShows$ = this.getAllCoverImagesById$(this.coverIndexTvShows);

    //Get all logo in images by id (themoviedb)
    this.logoImagesKeepWatching$ = this.getLogoImagesById$(
      this.coverIndexImgKeepWatchingTMDB
    );
    this.logoImagesMyList$ = this.getLogoImagesById$(
      this.coverIndexImgMyListTMDB
    );
    this.logoImagesTopRatedMovies$ = this.getLogoImagesById$(
      this.coverIndexTopRatedMoviesTMDB
    );
    this.logoImagesTvShows$ = this.getLogoImagesById$(
      this.coverIndexTvShowsTMDB
    );

    //Gel all genre by images id
    this.genresCoverImagesKeepWatching$ = this.getAllGenresById$(
      this.coverIndexImgKeepWatching
    );
    this.genresCoverImagesMyList$ = this.getAllGenresById$(
      this.coverIndexImgMyList
    );
    this.genresCoverImagesTopRatedMovies$ = this.getAllGenresById$(
      this.coverIndexTopRatedMovies
    );
    this.genresCoverImagesTvShows$ = this.getAllGenresById$(
      this.coverIndexTvShows
    );

    //Number of seasons by id
    this.numbersOfSeasonsKeepWatching$ = this.getAllNumbersOfSeasonsById$(
      this.coverIndexImgKeepWatching
    );
    this.numbersOfSeasonsMyList$ = this.getAllNumbersOfSeasonsById$(
      this.coverIndexImgMyList
    );
    this.numbersOfSeasonsTopRatedMovies$ = this.getAllNumbersOfSeasonsById$(
      this.coverIndexTopRatedMovies
    );
    this.numbersOfSeasonsTvShows$ = this.getAllNumbersOfSeasonsById$(
      this.coverIndexTvShows
    );
  }

  onPlayerReady() {
    this.player.playVideo();
    console.log('playerReady');
  }

  onStateChange() {
    if (this.player.getPlayerState() === 1) {
      console.log('Video starts');
    }

    if (this.player.getPlayerState() === 0) {
      this.showRefreshIcon = true;
      this.onClickSpeakerIcon();
      console.log('video completed');
    }
  }

  onReplayVideo() {
    this.showRefreshIcon = false;
    this.player.seekTo(0);
    this.player.playVideo();
  }

  openFullScreenLogo() {
    return this.dialogService.open(NfFullscreenLogoComponent, {
      baseZIndex: 10001,
      modal: true,
      draggable: false,
      dismissableMask: true,
      showHeader: false,
      closeOnEscape: true,
      width: '100%',
      height: '100%',
      transitionOptions: '600ms',
    });
  }

  playVideo(indexTheMovieDb: number) {
    if (this.player) {
      this.player.pauseVideo();
    }

    const dialogFullScreenPlayer: DynamicDialogRef = this.dialogService.open(
      NfFullscreenPlayerComponent,
      {
        baseZIndex: 10000,
        modal: true,
        draggable: false,
        dismissableMask: true,
        showHeader: false,
        closeOnEscape: true,
        width: '100%',
        height: '100%',
        transitionOptions: '600ms',
        data: {
          indexTheMovieDb: indexTheMovieDb,
        },
      }
    );

    /* On close dialog, open FullScreenLogo and resume video */
    dialogFullScreenPlayer.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const dialogFullScreenLogo: DynamicDialogRef =
          this.openFullScreenLogo();

        setTimeout(() => {
          dialogFullScreenLogo.close();
          this.renderer.removeStyle(document.body, 'overflow-y');
        }, 2000);
        setTimeout(() => {
          this.onReplayVideo();
        }, 3000);
      });
  }

  autoplayVideo() {
    setTimeout(() => {
      this.showVideoPreview = true;
      this.managePlayerService.initScriptIFrame();
    }, 3000);
  }

  onClickSpeakerIcon() {
    if (!!this.player && this.player?.getPlayerState() === 1) {
      this.showSpeakerUpIcon = !this.showSpeakerUpIcon;

      this.managePlayerService.changeMuteState(this.player);
    }
  }

  ngOnDestroy() {
    this.selectUserSub.unsubscribe();
    this.selectUser.currState();

    this.destroy$.next();
    this.destroy$.complete();
  }

  getCoverImageAndTypographyById$(
    coverId: number,
    indexBackground: number = 0,
    indexTypography: number = 0
  ): Observable<any[]> {
    const finalCoverTypoImage: any[] = [];

    return this.tvmazeService.searchImagesMovie(coverId).pipe(
      map((images) => {
        const arr = [];
        arr.push(images.filter((image) => image.type === 'background'));
        arr.push(images.filter((image) => image.type === 'typography'));

        if (arr[0][indexBackground]) {
          finalCoverTypoImage.push(arr[0][indexBackground]);
        }

        if (arr[1][indexTypography]) {
          finalCoverTypoImage.push(arr[1][indexTypography]);
        }

        return finalCoverTypoImage;
      })
    );
  }

  getLogoImagesById$(coverIndexImg: number[]): Observable<any[]> {
    const finalLogos: any[] = [];

    return from(coverIndexImg).pipe(
      concatMap((item) =>
        this.themoviedbService.getImagesById(item, 'tv').pipe(
          map((images) => {
            const filterByLangEn = images?.['logos'].filter(
              (logo: { iso_639_1: string }) => logo.iso_639_1 === 'en'
            );
            finalLogos.push(filterByLangEn[0]?.file_path);
            return finalLogos;
          })
        )
      ),
      shareReplay(1)
    );
  }

  getAllCoverImagesById$(coverIndexImg: number[]): Observable<any[]> {
    const finalCoverImages: any[] = [];

    return from(coverIndexImg).pipe(
      concatMap((item) => this.tvmazeService.searchImagesMovie(item)),
      switchMap((images) => {
        const backgroundImages = images.filter(
          (image) => image.type === 'background'
        );
        const bannerImages = images.filter((image) => image.type === 'banner');
        const posterImages = images.filter((image) => image.type === 'poster');

        //defined rand number in the range of background images
        let randNumbBackgroundImg;
        if (backgroundImages.length > 0) {
          randNumbBackgroundImg = this.utilitiesService.getRandomInt(
            backgroundImages.length
          );
          //Assign first background image to array
          finalCoverImages.push(
            backgroundImages[randNumbBackgroundImg]?.resolutions?.original?.url
          );
        }

        if (finalCoverImages.length == 0 && bannerImages.length > 0) {
          randNumbBackgroundImg = this.utilitiesService.getRandomInt(
            bannerImages.length
          );
          //Assign first background image to array
          finalCoverImages.push(
            bannerImages[randNumbBackgroundImg]?.resolutions?.original?.url
          );
        }

        if (finalCoverImages.length == 0 && posterImages.length > 0) {
          randNumbBackgroundImg = this.utilitiesService.getRandomInt(
            posterImages.length
          );
          //Assign first background image to array
          finalCoverImages.push(
            posterImages[randNumbBackgroundImg]?.resolutions?.original?.url
          );
        }

        return of(finalCoverImages);
      })
    );
  }

  getAllGenresById$(coverIndexImg: number[]): Observable<any[]> {
    const finalGenreSeasons: any[] = [];

    return from(coverIndexImg).pipe(
      concatMap((indexImg) =>
        this.tvmazeService.searchMainInfoMovie(indexImg).pipe(
          map((item) => {
            finalGenreSeasons.push(item.genres);
            return finalGenreSeasons;
          })
        )
      ),
      shareReplay(1)
    );
  }

  getAllNumbersOfSeasonsById$(coverIndexImg: number[]): Observable<any[]> {
    const finalNumberSeasons: any[] = [];

    return from(coverIndexImg).pipe(
      concatMap((indexImg) =>
        this.tvmazeService.searchNumberSeasonsById(indexImg).pipe(
          map((seasons) => {
            finalNumberSeasons.push([seasons.length]);
            return finalNumberSeasons;
          })
        )
      ),
      shareReplay(1)
    );
  }

  openDialogCoverImage(
    coverImage: any,
    index: number,
    indexTvMazeSeries: number,
    indexTheMovieDb?: number,
    logoImageURL?: string
  ) {
    this.indexSelectedItem = index;
    this.coverImagePreviewModal = coverImage;

    if (this.player) {
      this.player.pauseVideo();
    }

    const dialog: DynamicDialogRef = this.dialogService.open(
      PreviewModalContainerComponent,
      {
        baseZIndex: 10000,
        modal: true,
        draggable: false,
        dismissableMask: true,
        showHeader: false,
        closeOnEscape: true,
        keepInViewport: true,
        data: {
          randMatchScore: this.randMatchScore,
          ratingNumberCover: this.ratingNumberCover,
          numbersOfSeasonsKeepWatching$: this.numbersOfSeasonsKeepWatching$,
          coverImagePreviewModal: this.coverImagePreviewModal,
          indexSelectedItem: this.indexSelectedItem,
          indexTvMazeSeries: indexTvMazeSeries,
          indexTheMovieDb: indexTheMovieDb,
          logoImageURL: logoImageURL,
        },
      }
    );

    /* On close dialog, resume video */
    dialog.onClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.player.playVideo();
    });
  }

  //Use prevision random algorithm with size
  getWeightedRandomNumberInArr(objWithWeight: any, size: number) {
    const arrWeightedRand = [];
    for (let i = 0; i < size; i++) {
      arrWeightedRand.push(
        this.utilitiesService.getWeightedRandomNumber(objWithWeight)
      );
    }

    return arrWeightedRand;
  }

  onPlayStopEvent(isPause: boolean) {
    if (this.player) {
      //1 = Playing
      if (isPause && this.player?.getPlayerState() === 1) {
        this.player.pauseVideo();
        //2 = paused
      } else if (!isPause && this.player.getPlayerState() === 2) {
        this.player.playVideo();
      } else {
        this.onReplayVideo();
      }
    }
  }

  onEmitRatingNumber(ratingNumber: number) {
    this.mainMaturityRating = ratingNumber;
    this.cdr.detectChanges();
  }

  initializeSwiper() {
    const swiper = new Swiper('.swiper', {
      // modules: [Navigation, Pagination, A11y, Mousewheel],
      slidesOffsetBefore: 40,
      slidesOffsetAfter: 130,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
      },
      // Default parameters
      slidesPerView: 7,
      spaceBetween: 5,
      // Responsive breakpoints
      breakpoints: {
        1201: {
          slidesPerView: 7,
          spaceBetween: 5,
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        800: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        500: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        400: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        300: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        200: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
      },
    });
  }
}
