import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directive/dropdown.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective, SkeletonCardComponent],
  imports: [CommonModule, SkeletonModule],
  exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule, SkeletonCardComponent],
  providers: [],
})
export class SharedModule { }
