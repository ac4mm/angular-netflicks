import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'nf-fullscreen-player',
  templateUrl: 'nf-fullscreen-player.component.html',
  styleUrls: ['nf-fullscreen-player.component.scss']
})
export class NfFullscreenPlayerComponent {
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
    end: 35,
    mute: 0,
    autoplay: 1,
    allowfullscreen: 1,
    frameBorder: 0
  };

  elem: any;
  isMaximixe: boolean = false;
  isSpeakerDown: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    @Inject(DOCUMENT) private document: any
  ){}

  ngOnInit(){
    this.elem = document.documentElement;
  }

  onClickClose() {
    this.ref.close();
  }

  changeStatusSpeaker(){
    this.isSpeakerDown =!this.isSpeakerDown;
  }

  maximizeFullscreen(){
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