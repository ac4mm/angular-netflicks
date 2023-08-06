import { Component } from "@angular/core";

@Component({
  selector: 'nf-expand-button',
  template: `<button
                class="btn-circle btn-icon-cover arrow-down"
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
                  d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                  fill="#fff"
                ></path>
              </svg>
              </button>
  `,
  styleUrls: ['./nf-buttons.component.scss']
})
export class NfExpandButton {

}