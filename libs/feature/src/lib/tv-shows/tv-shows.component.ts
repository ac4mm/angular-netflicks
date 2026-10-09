import { Component } from '@angular/core';
import { SkeletonCardComponent } from '@shared/netflicks';

@Component({
  selector: 'nf-tv-shows',
  template: `<nf-skeleton-card></nf-skeleton-card>`,
  standalone: true,
  imports: [SkeletonCardComponent],
})
export class TvShowsComponent {}
