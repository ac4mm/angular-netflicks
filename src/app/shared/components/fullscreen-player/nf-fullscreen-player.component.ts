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

  elem: any;
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
    this.elem = document.documentElement;

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
    this.updateTimerDisplay();
    this.updateProgressBar();

    this.maxValueRange = this.player.getDuration();
    console.log("maxValueRange:",this.maxValueRange);

    setInterval(() => {
      this.updateTimerDisplay();
      this.updateProgressBar();
    }, 1000)
  }

  updateTimerDisplay() {
    /* this.valuePlayerBar = this.player.getCurrentTime(); */
  }

  updateProgressBar() {
    this.valuePlayerBar = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
    console.log("valuePlayerBar:",this.valuePlayerBar);
  }

  formatTime(time) {
    time = Math.round(time);

    let minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? Number('0' + seconds) : seconds;

    return minutes + ":" + seconds;
  }

  onChangeThumb(event: any): void {  
    console.log(event.target.value);

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
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
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