import { signal } from '@angular/core';
import { Component, EventEmitter, Output, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'nf-fullscreen-intro-animation',
  templateUrl: './fullscreen-intro-animation.component.html',
  styleUrl: './fullscreen-intro-animation.component.scss',
  standalone: true,
  imports: [],
})
export class FullscreenIntroAnimationComponent {
  private renderer = inject(Renderer2);

  showNetflicksLogo = signal(false);

  @Output() emitAudioEnded = new EventEmitter<boolean>();

  constructor() {
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');

    //Load audio 'tudum'
    const audio = new Audio('../../../../../../assets/audio/tudum.mp3');
    audio.load();

    audio.muted = false;
    audio.play();

    setTimeout(() => {
      this.showNetflicksLogo.set(true);
    }, 300);

    audio.addEventListener('ended', () => {
      this.emitAudioEnded.emit(true);
    });
  }
}
