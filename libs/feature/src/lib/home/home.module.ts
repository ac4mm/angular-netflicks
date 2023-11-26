import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileGateComponent } from './profile-gate/profile-gate.component';

import { ManageProfilesComponent } from '../manage-profiles/manage-profiles.component';
import { PreviewModalContainerComponent } from '@shared/netflicks';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { AsyncPipe, NgClass, NgOptimizedImage, NgStyle } from '@angular/common';


@NgModule({
    imports: [
    RouterModule.forChild([
        { path: '', component: HomeComponent },
        { path: '**', redirectTo: '/not-found' },
    ]),
    FormsModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    DropdownModule,
    SkeletonModule,
    YouTubePlayerModule,
    AsyncPipe,
    NgClass,
    NgStyle,
    NgOptimizedImage,
    HomeComponent,
    FooterComponent,
    ProfileGateComponent,
    ManageProfilesComponent,
    PreviewModalContainerComponent,
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
