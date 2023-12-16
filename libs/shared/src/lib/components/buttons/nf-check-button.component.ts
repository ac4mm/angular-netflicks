import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nf-check-button',
  template: `<button
    class="btn-circle btn-check btn-icon-cover"
    [ngClass]="mediumSize ? 'btn-circle-medium' : ''"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      stroke="white"
      stroke-width="0.3"
    >
      <path
        d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
        fill="#fff"
      ></path>
    </svg>
  </button> `,
  styleUrl: './nf-buttons.component.scss',
  standalone: true,
  imports: [NgClass],
})
export class NfCheckButtonComponent {
  @Input() mediumSize = false;
}
