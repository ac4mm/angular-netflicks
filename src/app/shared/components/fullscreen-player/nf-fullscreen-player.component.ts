import { DOCUMENT } from "@angular/common";
import { Component, Inject, ViewChild } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'nf-fullscreen-player',
  templateUrl: 'nf-fullscreen-player.component.html',
  styleUrls: ['nf-fullscreen-player.component.scss']
})
export class NfFullscreenPlayerComponent {
  @ViewChild('player') player: any;

  playerConfig = {
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
    cc_load_policy: 3
  };

  rootElem: HTMLElement | any;
  isMaximixe: boolean = false;
  speakerUpIconShow: boolean = true;
  playIconShow: boolean = true;
  valuePlayerBar = 0;
  maxValueRange;

  constructor(
    public ref: DynamicDialogRef,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    this.rootElem = document.documentElement;

    setTimeout(() => {
      /* this.showVideoPreview = true; */
      this.initScriptIFrame();
    }, 3000);
  }

  initScriptIFrame() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  onClickSpeakerIcon() {
    this.speakerUpIconShow = !this.speakerUpIconShow;

    if (this.player.isMuted()) {
      this.player.unMute();
    } else {
      this.player.mute();
    }
  }

  onReadyPlayer() {
    this.playIconShow = !this.playIconShow;
  }

  onApiChange() {
    // Update the controls on load
    this.updateProgressBar();

    this.maxValueRange = this.player.getDuration();

    setInterval(() => {
      this.updateProgressBar();
    }, 1000)
  }

  updateProgressBar() {
    this.valuePlayerBar = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
  }

  formatTime(time) {
    time = Math.round(time);

    let minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? Number('0' + seconds) : seconds;

    return minutes + ":" + seconds;
  }

  onChangeThumb(event: any): void {  
     // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = this.player.getDuration() * (event.target.value / 100);

    // Skip video to new time.
    this.player.seekTo(newTime);
  }

  onClickClose() {
    this.ref.close();
  }

  changeStatusSpeaker() {
    this.speakerUpIconShow = !this.speakerUpIconShow;

    if (this.player.isMuted()) {
      this.player.unMute();
    } else {
      this.player.mute();
    }
  }

  //https://developers.google.com/youtube/iframe_api_reference#getPlayerState
  changeStatusPlay() {
    if (this.player.getPlayerState() === 1) {
      this.player.pauseVideo();
    } else if (this.player.getPlayerState() === 2) {
      this.player.playVideo();
    }
    this.playIconShow = !this.playIconShow;
  }

  goAhead10sNext() {
    this.player.seekTo(this.player.getCurrentTime() + 10)
  }

  comeBack10sPrev() {
    this.player.seekTo(this.player.getCurrentTime() - 10);
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