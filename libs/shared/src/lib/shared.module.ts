import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

import { NfPlayButtonComponent } from './components/buttons/nf-play-button.component';
import { NfAddButtonComponent } from './components/buttons/nf-add-button.component';
import { NfCheckButtonComponent } from './components/buttons/nf-check-button.component';
import { NfThumbUpButtonComponent } from './components/buttons/nf-thumb-up-button.component';
import { NfExpandButtonComponent } from './components/buttons/nf-expand-button.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NfFullscreenPlayerComponent } from './components/fullscreen-player/nf-fullscreen-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NfFullscreenLogoComponent } from './components/fullscreen-logo/nf-fullscreen-logo.component';
import { NfCloseButtonComponent } from './components/buttons/nf-close-button.component';
import { NfSpeakerupButtonComponent } from './components/buttons/nf-speakerup-button.component';
import { NfSpeakerdownButtonComponent } from './components/buttons/nf-speakerdown-button.component';
import { FullscreenIntroAnimationComponent } from './components/fullscreen-intro-animation/fullscreen-intro-animation.component';
import { SwiperContainerComponent } from './components/swiper-container/swiper-container.component';

@NgModule({
  declarations: [
    NfPlayButtonComponent,
    NfAddButtonComponent,
    NfCheckButtonComponent,
    NfCloseButtonComponent,
    NfThumbUpButtonComponent,
    NfExpandButtonComponent,
    NfSpeakerdownButtonComponent,
    NfSpeakerupButtonComponent,
    LoadingSpinnerComponent,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent,
    NfFullscreenLogoComponent,
    FullscreenIntroAnimationComponent,
    SwiperContainerComponent,
  ],
  imports: [CommonModule, SkeletonModule, YouTubePlayerModule],
  exports: [
    CommonModule,
    NfPlayButtonComponent,
    NfAddButtonComponent,
    NfCheckButtonComponent,
    NfCloseButtonComponent,
    NfThumbUpButtonComponent,
    NfExpandButtonComponent,
    NfSpeakerdownButtonComponent,
    NfSpeakerupButtonComponent,
    LoadingSpinnerComponent,
    SkeletonCardComponent,
    NfFullscreenPlayerComponent,
    NfFullscreenLogoComponent,
    FullscreenIntroAnimationComponent,
    SwiperContainerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
