import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { PreviewModalContainer } from './preview-modal-container/preview-modal-container.component';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { SharedModule } from '@shared/netflicks';
import { MaterialModule } from '@material/module';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    ProfileGateComponent,
    ManageProfilesComponent,
    PreviewModalContainer,
  ],
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
    YouTubePlayerModule,
    AsyncPipe,
    NgClass,
    NgStyle,
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    ProfileGateComponent,
    ManageProfilesComponent,
    PreviewModalContainer,
  ],
  providers: [],
})
export class HomeModule {}
