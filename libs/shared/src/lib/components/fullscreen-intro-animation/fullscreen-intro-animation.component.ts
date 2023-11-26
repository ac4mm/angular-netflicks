import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'nf-fullscreen-intro-animation',
    templateUrl: './fullscreen-intro-animation.component.html',
    styleUrls: ['./fullscreen-intro-animation.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class FullscreenIntroAnimationComponent {
  showNetflicksLogo = false;

  @Output() emitAudioEnded = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2) {
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');

    //Load audio 'tudum'
    const audio = new Audio('../../../../../../assets/audio/tudum.mp3');
    audio.load();

    audio.muted = false;
    audio.play();

    setTimeout(() => {
      this.showNetflicksLogo = true;
    }, 300);

    audio.addEventListener('ended', () => {
      this.emitAudioEnded.emit(true);
    });
  }
}
