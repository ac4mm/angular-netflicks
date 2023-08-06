import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../../../../src/app/app-routing.module';
import { ManageProfilesComponent } from './manage-profiles/manage-profiles.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AppRoutingModule, AuthModule, HomeModule],
  exports: [NavbarComponent],
})
export class LibsFeatureModule {}
