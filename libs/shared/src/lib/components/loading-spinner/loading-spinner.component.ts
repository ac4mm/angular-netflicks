import { Component } from '@angular/core';

@Component({
  selector: 'nf-loading-spinner',
  template: `<div id="loader" class="nfLoader"></div>`,
  styles: [
    `
      .nfLoader {
        position: absolute;
        top: 48%;
        left: 49%;
        width: 50px;
        height: 50px;
        z-index: 11;
      }

      .nfLoader:after {
        content: '';
        background-image: url(https://assets.nflxext.com/en_us/pages/wiplayer/site-spinner.png);
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        -moz-background-size: 100%;
        -o-background-size: 100%;
        background-size: 100%;
        position: absolute;
        margin: -6px;
        width: inherit;
        height: inherit;
        animation: nfLoader-spin 1.1s linear infinite, 1 !important;
        -webkit-animation: nfLoader-spin 1.1s linear infinite, 1 !important;
      }
      @keyframes nfLoader-spin {
        100% {
          transform: rotate(360deg);
        }
      }
      @-webkit-keyframes nfLoader-spin {
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {}
