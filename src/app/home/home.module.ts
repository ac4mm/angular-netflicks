import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { SelectUserService } from '../shared/services/select-user.service';
import { PreviewCardDialog } from 'src/app/home/preview-card-dialog/preview-card-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [HomeComponent, ProfileGateComponent, ManageProfilesComponent, PreviewCardDialog],
  imports: [
    NgxUsefulSwiperModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/not-found' },
    ]),
    SharedModule,
    MaterialModule
  ],
  exports: [HomeComponent, ProfileGateComponent, ManageProfilesComponent, PreviewCardDialog],
  providers: [],
})
export class HomeModule { }
