import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { SelectUserService } from '../shared/services/select-user.service';
import { MaterialModule } from 'src/app/material.module';
import { PreviewModalContainer } from './preview-modal-container/preview-modal-container.component'

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  declarations: [HomeComponent, FooterComponent, ProfileGateComponent, ManageProfilesComponent, PreviewModalContainer],
  imports: [
    NgxUsefulSwiperModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/not-found' },
    ]),
    FormsModule,
    SharedModule,
    MaterialModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    DropdownModule,
    SkeletonModule,
    YouTubePlayerModule
  ],
  exports: [HomeComponent, FooterComponent, ProfileGateComponent, ManageProfilesComponent, PreviewModalContainer],
  providers: [],
})
export class HomeModule { }
