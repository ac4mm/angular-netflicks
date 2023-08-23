import { AfterViewInit, Component, Input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
// import { PreviewModalContainerComponent } from '@feature/home/preview-modal-container/preview-modal-container.component';
import { takeUntil } from 'rxjs';
import Swiper, { A11y, Mousewheel, Navigation, Pagination } from 'swiper';
// import { NfFullscreenPlayerComponent } from '@shared/netflicks';

@Component({
  selector: 'nf-swiper-container',
  templateUrl: './swiper-container.component.html',
  styleUrls: ['./swiper-container.component.scss'],
})
export class SwiperContainerComponent implements AfterViewInit {
  @Input() titleSlide: string;
  @Input() coverImages: string[] = [];
  @Input() logoImages: string[] = [];
  @Input() coverIndexImages: number[] = [];
  @Input() coverIndexImagesTMDB: number[] = [];
  @Input() numbersOfSeasons: string[] = [];
  @Input() genresCoverImages: string[] = [];

  randMatchScore: number[] = [];
  ratingNumberCover: (string | undefined)[] = [];

  showCheckIcon = false;

  //TODO to implements
  playVideo(indexTheMovieDb: number) {
    // if (this.player) {
    //   this.player.pauseVideo();
    // }
    //
    // const dialogFullScreenPlayer: DynamicDialogRef = this.dialogService.open(
    //   NfFullscreenPlayerComponent,
    //   {
    //     baseZIndex: 10000,
    //     modal: true,
    //     draggable: false,
    //     dismissableMask: true,
    //     showHeader: false,
    //     closeOnEscape: true,
    //     width: '100%',
    //     height: '100%',
    //     transitionOptions: '600ms',
    //     data: {
    //       indexTheMovieDb: indexTheMovieDb,
    //     },
    //   }
    // );
    //
    // /* On close dialog, open FullScreenLogo and resume video */
    // dialogFullScreenPlayer.onClose
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(() => {
    //     const dialogFullScreenLogo: DynamicDialogRef =
    //       this.openFullScreenLogo();
    //
    //     setTimeout(() => {
    //       dialogFullScreenLogo.close();
    //       this.renderer.removeStyle(document.body, 'overflow-y');
    //     }, 2000);
    //     setTimeout(() => {
    //       this.onReplayVideo();
    //     }, 3000);
    //   });
  }

  onClickShowCheckIcon() {}

  openDialogCoverImage(
    coverImage: any,
    index: number,
    indexTvMazeSeries: number,
    indexTheMovieDb?: number,
    logoImageURL?: string
  ) {
    // this.indexSelectedItem = index;
    // this.coverImagePreviewModal = coverImage;
    //
    // if (this.player) {
    //   this.player.pauseVideo();
    // }
    //
    // const dialog: DynamicDialogRef = this.dialogService.open(
    //   PreviewModalContainerComponent,
    //   {
    //     baseZIndex: 10000,
    //     modal: true,
    //     draggable: false,
    //     dismissableMask: true,
    //     showHeader: false,
    //     closeOnEscape: true,
    //     keepInViewport: true,
    //     data: {
    //       randMatchScore: this.randMatchScore,
    //       ratingNumberCover: this.ratingNumberCover,
    //       numbersOfSeasonsKeepWatching$: this.numbersOfSeasonsKeepWatching$,
    //       coverImagePreviewModal: this.coverImagePreviewModal,
    //       indexSelectedItem: this.indexSelectedItem,
    //       indexTvMazeSeries: indexTvMazeSeries,
    //       indexTheMovieDb: indexTheMovieDb,
    //       logoImageURL: logoImageURL,
    //     },
    //   }
    // );
    //
    // /* On close dialog, resume video */
    // dialog.onClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.player.playVideo();
    // });
  }

  ngAfterViewInit() {
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
