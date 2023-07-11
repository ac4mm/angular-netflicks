import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { NfPlayButton } from '@shared/components/buttons/nf-play-button.component';
import { NfAddButton } from '@shared/components/buttons/nf-add-button.component';
import { NfCheckButton } from '@shared/components/buttons/nf-check-button.component';
import { NfThumbUpButton } from '@shared/components/buttons/nf-thumb-up-button.component';
import { NfExpandButton } from '@shared/components/buttons/nf-expand-button.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { NfFullscreenPlayerComponent } from '@shared/components/fullscreen-player/nf-fullscreen-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    NfPlayButton,
    NfAddButton,
    NfCheckButton,
    NfThumbUpButton,
    NfExpandButton,
    LoadingSpinnerComponent,
    DropdownDirective,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    YouTubePlayerModule
  ],
  exports: [
    CommonModule,
    NfPlayButton,
    NfAddButton,
    NfCheckButton,
    NfThumbUpButton,
    NfExpandButton,
    LoadingSpinnerComponent,
    DropdownDirective,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent
  ],
  providers: [],
})
export class SharedModule { }
