import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TheMovieDBService } from '../../services/themoviedb.service';
import { ManagePlayerService } from '../../services/manage-player.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'nf-fullscreen-player',
  templateUrl: 'nf-fullscreen-player.component.html',
  styleUrls: ['nf-fullscreen-player.component.scss'],
})
export class NfFullscreenPlayerComponent implements OnInit {
  @ViewChild('player') player: YouTubePlayer;

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
  isMaximixe = false;
  showSpeakerUpIcon = true;
  showPlayIcon = true;
  valuePlayerBar = 0;
  maxValueRange: number;

  seriesTvMainTitle$: Observable<any>;
  seriesTvVideoKey$: Observable<any>;
  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public themoviedbService: TheMovieDBService,
    @Inject(DOCUMENT) private document: any,
    private managePlayerService: ManagePlayerService
  ) {}

  ngOnInit() {
    this.rootElem = document.documentElement;

    this.seriesTvMainTitle$ = this.themoviedbService
      .getTvMovieDetailById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(map((item) => item?.name));
    this.seriesTvVideoKey$ = this.themoviedbService
      .getVideosById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(map((item) => item?.results[0].key));

    setTimeout(() => {
      this.managePlayerService.initScriptIFrame();
    }, 3000);
  }

  onClickSpeakerIcon() {
    this.showSpeakerUpIcon = !this.showSpeakerUpIcon;

    this.managePlayerService.changeMuteState(this.player);
  }

  onReadyPlayer() {
    this.showPlayIcon = !this.showPlayIcon;
    this.isLoading$.next(false);
  }

  onApiChange() {
    // Update the controls on load
    this.updateProgressBar();

    console.log('this.player:', this.player);
    this.maxValueRange = this.player.getDuration();

    setInterval(() => {
      this.updateProgressBar();
    }, 1000);
  }

  updateProgressBar() {
    this.valuePlayerBar =
      (this.player.getCurrentTime() / this.player.getDuration()) * 100;
  }

  formatTime(time: number) {
    time = Math.round(time);

    const minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    seconds = seconds < 10 ? Number('0' + seconds) : seconds;

    return minutes + ':' + seconds;
  }

  onChangeThumb(event: any): void {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    const newTime = this.player.getDuration() * (event.target.value / 100);

    // Skip video to new time.
    this.player.seekTo(newTime, true);
  }

  onClickClose() {
    this.ref.close();
  }

  changeStatusSpeaker() {
    this.showSpeakerUpIcon = !this.showSpeakerUpIcon;

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
    this.isMaximixe = !this.isMaximixe;
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
    this.isMaximixe = !this.isMaximixe;
  }
}
