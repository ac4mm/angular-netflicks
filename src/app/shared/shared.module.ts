import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { SkeletonCardComponent } from 'src/app/shared/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './services/dropdown.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective, SkeletonCardComponent],
  imports: [CommonModule, SkeletonModule],
  exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule, SkeletonCardComponent],
  providers: [],
})
export class SharedModule { }
