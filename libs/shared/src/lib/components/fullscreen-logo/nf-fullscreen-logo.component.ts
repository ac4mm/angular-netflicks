import { Component, Renderer2 } from '@angular/core';

@Component({
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
  styleUrls: ['nf-fullscreen-logo.component.scss'],
})
export class NfFullscreenLogoComponent {
  constructor(private renderer: Renderer2) {
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }
}
