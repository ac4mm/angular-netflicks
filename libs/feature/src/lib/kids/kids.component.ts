import { Component } from '@angular/core';
import { SkeletonCardComponent } from '@shared/netflicks';

@Component({
  selector: 'nf-kids',
  template: ` <nf-skeleton-card></nf-skeleton-card> `,
  standalone: true,
  imports: [SkeletonCardComponent],
})
export class KidsComponent {}
