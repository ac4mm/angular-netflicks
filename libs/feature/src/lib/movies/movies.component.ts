import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { SkeletonCardComponent } from '@shared/netflicks';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nf-movies',
  template: ` <nf-skeleton-card></nf-skeleton-card> `,
  standalone: true,
  imports: [SkeletonCardComponent],
})
export class MoviesComponent {}
