import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { SelectUserService } from '../shared/select-user.service';

@NgModule({
  declarations: [HomeComponent, ProfileGateComponent, ManageProfilesComponent],
  imports: [
    NgxUsefulSwiperModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/not-found' },
    ]),
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule { }
