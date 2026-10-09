import { Component } from '@angular/core';

@Component({
  selector: 'nf-play-button',
  template: `<button class="btn-circle-white btn-icon-cover">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
        fill="#000"
      ></path>
    </svg>
  </button> `,
  styleUrl: './nf-buttons.component.scss',
  standalone: true,
})
export class NfPlayButtonComponent {}
