import { Component, Renderer2 } from "@angular/core";

@Component({
  selector: 'nf-fullscreen-logo',
  templateUrl: 'nf-fullscreen-logo.component.html',
  styleUrls: ['nf-fullscreen-logo.component.scss']
})
export class NfFullscreenLogoComponent {
  constructor(private renderer: Renderer2){
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }
}