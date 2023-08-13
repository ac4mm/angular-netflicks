import { Component, Input } from '@angular/core';

@Component({
  selector: 'nf-loading-spinner',
  template: `<div
      id="loader"
      [ngClass]="!!profileId ? 'nfLoaderProfile' : 'nfLoader'"
    ></div>
    <div
      *ngIf="profileId"
      class="profile-icon"
      [ngStyle]="{
        'background-image':
          'url(' + '../../assets/img/account' + profileId + '.png' + ')'
      }"
    ></div> `,
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

      .nfLoaderProfile {
        position: absolute;
        top: 43%;
        left: 43%;
        width: 8vw;
        height: 8vw;
        z-index: 14;
      }

      .nfLoader:after,
      .nfLoaderProfile:after {
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

      .profile-icon {
        position: absolute;
        width: 5vw;
        height: 5vw;
        max-height: 100%;
        max-width: 100%;
        box-sizing: border-box;
        border: 0.08em solid #1f1f1f;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        top: 45%;
        left: 48%;
        z-index: 13;
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

      /*  Media query*/
      @media only screen and (min-width: 400px) and (max-width: 500px) {
        .nfLoaderProfile {
          width: 9vw;
          height: 12vw;
        }
      }

      @media only screen and (min-width: 300px) and (max-width: 400px) {
        .profile-icon {
          top: 45%;
          left: 45%;
          width: 14vw;
          height: 14vw;
        }

        .nfLoaderProfile {
          top: 43%;
          left: 25%;
          width: 29vw;
          height: 30vw;
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() profileImg = false;
  @Input() profileId: number;
}
