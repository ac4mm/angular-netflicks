import { Component, Input } from '@angular/core';

@Component({
  selector: 'nf-skeleton-card',
  template: `
    <div class="container-sm">
      @for (row of rowsArray; track row) {
        <div class="row row-skeleton">
          <div class="row">
            <div class="col-12">
              <div class="skeleton skeleton-title" [style.width]="titleWidth"></div>
            </div>
          </div>

          <div class="row g-3">
            @for (col of columnsArray; track col) {
              <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                <div
                  class="skeleton skeleton-card"
                  [style.width]="cardWidth"
                  [style.height]="cardHeight"
                ></div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      @media (min-width: 1200px) {
        .container-sm {
          max-width: 1350px !important;
          margin-top: 60px;
          margin-bottom: 60px;
        }
      }

      .row-skeleton {
        margin: 10px 0 22px;
      }

      .skeleton {
        position: relative;
        overflow: hidden;
        display: block;
        border-radius: 6px;
        background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.2s ease-in-out infinite;
      }

      .skeleton-title {
        height: 24px;
        margin-bottom: 0.75rem;
      }

      .skeleton-card {
        width: 100%;
        height: 133px;
        border-radius: 8px;
      }

      @keyframes skeleton-loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
  standalone: true,
})
export class SkeletonCardComponent {
  @Input() rows = 4;
  @Input() columns = 6;
  @Input() titleWidth = '20rem';
  @Input() cardWidth = '100%';
  @Input() cardHeight = '133px';

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, index) => index);
  }

  get columnsArray(): number[] {
    return Array.from({ length: this.columns }, (_, index) => index);
  }
}
