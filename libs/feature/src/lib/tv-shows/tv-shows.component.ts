import { Component } from '@angular/core';

@Component({
  selector: 'nf-tv-shows',
  template: `<nf-skeleton-card></nf-skeleton-card>`,
  styles: [
    `
      @media (min-width: 1200px) {
        .container-xl,
        .container-lg,
        .container-md,
        .container-sm,
        .container {
          max-width: 1350px !important;
        }

        .container-sm {
          margin-top: 60px;
        }
      }

      .row-skeleton {
        margin: 10px 0;
      }
    `,
  ],
})
export class TvShowsComponent {}
