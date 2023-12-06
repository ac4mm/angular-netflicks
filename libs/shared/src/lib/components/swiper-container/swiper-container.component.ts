import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Swiper, A11y, Mousewheel, Navigation, Pagination } from 'swiper';
import { UtilitiesService } from '../../services/utilities.service';
import { NfFullscreenLogoComponent } from '../fullscreen-logo/nf-fullscreen-logo.component';
import { NfFullscreenPlayerComponent } from '../fullscreen-player/nf-fullscreen-player.component';
import { PreviewModalContainerComponent } from '../preview-modal-container/preview-modal-container.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { RatingNumberObject } from '../../model/shared-types.model';
import { NfExpandButtonComponent } from '../buttons/nf-expand-button.component';
import { NfThumbUpButtonComponent } from '../buttons/nf-thumb-up-button.component';
import { NfCheckButtonComponent } from '../buttons/nf-check-button.component';
import { NfAddButtonComponent } from '../buttons/nf-add-button.component';
import { NfPlayButtonComponent } from '../buttons/nf-play-button.component';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'nf-swiper-container',
  templateUrl: './swiper-container.component.html',
  styleUrls: ['./swiper-container.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NfPlayButtonComponent,
    NfAddButtonComponent,
    NfCheckButtonComponent,
    NfThumbUpButtonComponent,
    NfExpandButtonComponent,
    NgOptimizedImage,
  ],
})
export class SwiperContainerComponent implements OnInit, AfterViewInit {
  @Input() titleSlide: string;
  @Input() coverImages: string[] = [];
  @Input() logoImages: string[] = [];
  @Input() coverIndexImages: number[] = [];
  @Input() coverIndexImagesTMDB: number[] = [];
  @Input() numbersOfSeasons: number[][] = [];
  @Input() genresCoverImages: string[][] = [];

  @Output() playStopEvent = new EventEmitter<boolean>();
  @Output() emitRatingNumber = new EventEmitter<number>();

  randMatchScore: number[] = [];
  ratingNumberCover: (string | undefined)[] = [];

  //7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
  ratingNumberObject = { 7: 0.1, 13: 0.2, 16: 0.4, 18: 0.6 };

  showCheckIcon = true;
  showRefreshIcon = false;

  @ViewChild('player') player: YouTubePlayer;

  indexSelectedItem: number;
  coverImagePreviewModal: string;

  private destroy$ = new Subject<void>();

  constructor(
    private utilitiesService: UtilitiesService,
    public dialogService: DialogService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    //Setting with random number, the match score
    this.randMatchScore = Array.from(
      { length: this.coverIndexImages.length },
      () => this.utilitiesService.getRandomIntBetweenRange(64, 100)
    );

    //setting rating number cover with distribution weight
    this.ratingNumberCover = this.getWeightedRandomNumberInArr(
      this.ratingNumberObject,
      7
    );

    //if it exists I emit the rating number of cover image (Stranger Things)
    if (this.ratingNumberCover?.[1]) {
      this.emitRatingNumber.emit(+this.ratingNumberCover[1]);
    }
  }

  playVideo(indexTheMovieDb: number, event?: Event) {
    //Used to avoid double open dialog, since there are two nested invocations function
    if (event) {
      event.stopPropagation();
    }

    this.playStopEvent.emit(true);

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
          /* On close dialog, resume video */
          this.playStopEvent.emit(false);
        }, 3000);
      });
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

  onClickShowCheckIcon(event: Event) {
    this.showCheckIcon = !this.showCheckIcon;

    if (event) {
      event.stopPropagation();
    }
  }

  openDialogCoverImage(
    coverImage: string,
    index: number,
    indexTvMazeSeries: number,
    indexTheMovieDb?: number,
    logoImageURL?: string,
    event?: Event
  ) {
    //Used to avoid double open dialog, since there are two nested invocations function
    if (event) {
      event.stopPropagation();
    }

    this.indexSelectedItem = index;
    this.coverImagePreviewModal = coverImage;

    this.playStopEvent.emit(true);

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
      this.playStopEvent.emit(false);
    });
  }

  //Use prevision random algorithm with size
  getWeightedRandomNumberInArr(
    objWithWeight: RatingNumberObject,
    size: number
  ) {
    const arrWeightedRand = [];
    for (let i = 0; i < size; i++) {
      arrWeightedRand.push(
        this.utilitiesService.getWeightedRandomNumber(objWithWeight)
      );
    }

    return arrWeightedRand;
  }

  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, A11y, Mousewheel],
      autoHeight: true,
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
      spaceBetween: 10,
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
