import { NgModule } from '@angular/core';
import { MdcButtonModule } from '@angular-mdc/web/button';
import { MdcDialogModule } from '@angular-mdc/web/dialog';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcDialogModule
  ]
})
export class MaterialModule { }