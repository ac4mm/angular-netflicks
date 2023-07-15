import { Component } from "@angular/core";
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

  constructor(
    public ref: DynamicDialogRef,
  ){}

  ngOnInit(){
    this.elem = document.documentElement;
  }

  onClickClose() {
    this.ref.close();
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
  }
}