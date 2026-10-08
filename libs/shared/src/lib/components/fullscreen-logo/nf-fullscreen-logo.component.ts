import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Renderer2, inject } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'nf-fullscreen-logo',
  template: `
    <div class="watch-video">
      <div class="watch-video-leaving-view">
        <div class="nf-screen-wrapper">
          <div class="nf-screen">
            <div class="nf-screen-logo"></div>
            <div class="nf-screen-light"></div>
            <div class="nf-screen-shadow"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: 'nf-fullscreen-logo.component.scss',
  standalone: true,
})
export class NfFullscreenLogoComponent {
  private renderer = inject(Renderer2);

  constructor() {
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }
}
