import { ChangeDetectionStrategy, signal } from '@angular/core';
import { DOCUMENT, AsyncPipe } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { TheMovieDBService } from '../../services/themoviedb.service';
import { ManagePlayerService } from '../../services/manage-player.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, map } from 'rxjs';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nf-fullscreen-player',
  templateUrl: 'nf-fullscreen-player.component.html',
  styleUrl: 'nf-fullscreen-player.component.scss',
  standalone: true,
  imports: [LoadingSpinnerComponent, YouTubePlayerModule, AsyncPipe],
})
export class NfFullscreenPlayerComponent implements OnInit {
  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  themoviedbService = inject(TheMovieDBService);
  private document: any = inject(DOCUMENT);
  private managePlayerService = inject(ManagePlayerService);

  @ViewChild('player') player: YouTubePlayer;

  playerWidth = signal(0);
  playerHeight = signal(0);

  playerVars = {
    autoHide: 1,
    controls: 0,
    showInfo: 0,
    autoPlay: 1,
    modestbranding: 1,
    disablekb: 1,
    rel: 0,
    fs: 0,
    playsinline: 1,
    loop: 0,
    mute: 0,
    autoplay: 1,
    allowfullscreen: 1,
    frameBorder: 0,
    cc_load_policy: 3,
    origin: location.href,
  };

  episodeTitle = 'Official Trailer';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootElem: HTMLElement | any;
  isMaximixe = signal(false);
  showSpeakerUpIcon = signal(true);
  showPlayIcon = signal(true);
  valuePlayerBar = signal(0);
  maxValueRange = signal<number | undefined>(undefined);

  seriesTvMainTitle$: Observable<string>;
  seriesTvVideoKey$: Observable<string>;
  isLoading = signal(true);

  ngOnInit() {
    this.updatePlayerDimensions();
    this.rootElem = document.documentElement;

    this.seriesTvMainTitle$ = this.themoviedbService
      .getTvMovieDetailById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(map((item) => item?.name));
    this.seriesTvVideoKey$ = this.themoviedbService
      .getVideosById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(map((item) => item?.results[0]?.key));

    setTimeout(() => {
      this.managePlayerService.initScriptIFrame();
    }, 3000);
  }

  @HostListener('window:resize')
  updatePlayerDimensions(): void {
    this.playerWidth.set(Math.max(window.innerWidth, 1920));
    this.playerHeight.set(Math.max(window.innerHeight, 1080));
  }

  onReadyPlayer() {
    this.showPlayIcon.update((show) => !show);
    this.isLoading.set(false);
  }

  onApiChange() {
    // Update the controls on load
    this.updateProgressBar();

    this.maxValueRange.set(this.player.getDuration());

    setInterval(() => {
      this.updateProgressBar();
    }, 1000);
  }

  updateProgressBar() {
    this.valuePlayerBar.set(
      (this.player.getCurrentTime() / this.player.getDuration()) * 100
    );
  }

  formatTime(time: number) {
    time = Math.round(time);

    const minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    seconds = seconds < 10 ? Number('0' + seconds) : seconds;

    return minutes + ':' + seconds;
  }

  onChangeThumb(event: Event): void {
    // Cast event.target to HTMLInputElement
    const target = event.target as HTMLInputElement;
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    const newTime =
      this.player.getDuration() * (parseFloat(target.value) / 100);

    // Skip video to new time.
    this.player.seekTo(newTime, true);
  }

  onClickClose() {
    this.ref.close();
  }

  changeStatusSpeaker() {
    this.showSpeakerUpIcon.update((show) => !show);

    this.managePlayerService.changeMuteState(this.player);
  }

  //https://developers.google.com/youtube/iframe_api_reference#getPlayerState
  changeStatusPlay() {
    if (this.player.getPlayerState() === 1) {
      this.player.pauseVideo();
    } else if (this.player.getPlayerState() === 2) {
      this.player.playVideo();
    }

    this.onReadyPlayer();
  }

  goAhead10sNext() {
    this.player.seekTo(this.player.getCurrentTime() + 10, true);
  }

  comeBack10sPrev() {
    this.player.seekTo(this.player.getCurrentTime() - 10, true);
  }

  maximizeFullscreen() {
    if (this.rootElem.requestFullscreen) {
      this.rootElem.requestFullscreen();
    } else if (this.rootElem.mozRequestFullScreen) {
      /* Firefox */
      this.rootElem.mozRequestFullScreen();
    } else if (this.rootElem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.rootElem.webkitRequestFullscreen();
    } else if (this.rootElem.msRequestFullscreen) {
      /* IE/Edge */
      this.rootElem.msRequestFullscreen();
    }
    this.isMaximixe.update((maximized) => !maximized);
  }

  minimizeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.isMaximixe.update((maximized) => !maximized);
  }
}
