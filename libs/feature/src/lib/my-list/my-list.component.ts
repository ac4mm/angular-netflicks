import { Component } from '@angular/core';
import { SkeletonCardComponent } from '@shared/netflicks';

@Component({
  selector: 'nf-my-list',
  template: ` <nf-skeleton-card></nf-skeleton-card> `,
  standalone: true,
  imports: [SkeletonCardComponent],
})
export class MyListComponent {}
