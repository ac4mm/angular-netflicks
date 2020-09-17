import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { SelectUserService } from './select-user.service';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule],
  providers: [],
})
export class SharedModule {}
