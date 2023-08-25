import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { PreviewModalContainerComponent } from './preview-modal-container/preview-modal-container.component';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { SharedModule } from '@shared/netflicks';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    ProfileGateComponent,
    ManageProfilesComponent,
    PreviewModalContainerComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/not-found' },
    ]),
    FormsModule,
    SharedModule,
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
    PreviewModalContainerComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
