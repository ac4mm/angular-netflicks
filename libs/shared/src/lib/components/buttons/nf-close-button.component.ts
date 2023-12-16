import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nf-close-button',
  template: `<button
    class="btn-circle btn-icon-cover btn-round-blk"
    [ngClass]="mediumSize ? 'btn-circle-medium' : 'btn-circle'"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      role="button"
      aria-label="close"
      tabindex="0"
    >
      <path
        d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
        fill="#fff"
      ></path>
    </svg>
  </button> `,
  styleUrl: './nf-buttons.component.scss',
  standalone: true,
  imports: [NgClass],
})
export class NfCloseButtonComponent {
  @Input() mediumSize = false;
}
