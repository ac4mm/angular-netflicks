import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './services/dropdown.directive';
import { SkeletonCardComponent } from 'src/app/shared/skeleton-card/skeleton-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective, SkeletonCardComponent],
  imports: [CommonModule, SkeletonModule],
  exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule, SkeletonCardComponent],
  providers: [],
})
export class SharedModule { }
