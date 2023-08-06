import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { NfPlayButton } from './components/buttons/nf-play-button.component';
import { NfAddButton } from './components/buttons/nf-add-button.component';
import { NfCheckButton } from './components/buttons/nf-check-button.component';
import { NfThumbUpButton } from './components/buttons/nf-thumb-up-button.component';
import { NfExpandButton } from './components/buttons/nf-expand-button.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { NfFullscreenPlayerComponent } from './components/fullscreen-player/nf-fullscreen-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NfFullscreenLogoComponent } from './components/fullscreen-logo/nf-fullscreen-logo.component';
import { NfCloseButton } from './components/buttons/nf-close-button.component';
import { NfSpeakerupButton } from './components/buttons/nf-speakerup-button.component';
import { NfSpeakerdownButton } from './components/buttons/nf-speakerdown-button.component';

@NgModule({
  declarations: [
    NfPlayButton,
    NfAddButton,
    NfCheckButton,
    NfCloseButton,
    NfThumbUpButton,
    NfExpandButton,
    NfSpeakerdownButton,
    NfSpeakerupButton,
    LoadingSpinnerComponent,
    DropdownDirective,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent,
    NfFullscreenLogoComponent,
  ],
  imports: [CommonModule, SkeletonModule, YouTubePlayerModule],
  exports: [
    CommonModule,
    NfPlayButton,
    NfAddButton,
    NfCheckButton,
    NfCloseButton,
    NfThumbUpButton,
    NfExpandButton,
    NfSpeakerdownButton,
    NfSpeakerupButton,
    LoadingSpinnerComponent,
    DropdownDirective,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent,
    NfFullscreenLogoComponent,
  ],
  providers: [],
})
export class SharedModule {}
