import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { NfAddButton } from '@shared/components/buttons/nf-add-button.component';
import { NfThumbUpButton } from '@shared/components/buttons/nf-thumb-up-button.component';
import { NfExpandButton } from '@shared/components/buttons/nf-expand-button.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directive/dropdown.directive';

@NgModule({
  declarations: [NfAddButton, NfThumbUpButton, NfExpandButton, LoadingSpinnerComponent, DropdownDirective, SkeletonCardComponent],
  imports: [CommonModule, SkeletonModule],
  exports: [NfAddButton, NfThumbUpButton, NfExpandButton, LoadingSpinnerComponent, DropdownDirective, CommonModule, SkeletonCardComponent],
  providers: [],
})
export class SharedModule { }
