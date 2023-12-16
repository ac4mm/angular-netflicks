import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nf-add-button',
  template: `<button
    class="btn-circle btn-add btn-icon-cover"
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
      <path d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="#fff"></path>
    </svg>
  </button> `,
  styleUrl: './nf-buttons.component.scss',
  standalone: true,
  imports: [NgClass],
})
export class NfAddButtonComponent {
  @Input() mediumSize = false;
}
