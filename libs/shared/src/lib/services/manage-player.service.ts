import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NfFullscreenLogoComponent } from '../components/fullscreen-logo/nf-fullscreen-logo.component';
import { NfFullscreenPlayerComponent } from '../components/fullscreen-player/nf-fullscreen-player.component';
import { PreviewModalContainerComponent } from '../components/preview-modal-container/preview-modal-container.component';
import { COMMON_CONFIG_DIALOG } from '../model/common-config-dialog.model';

@Injectable()
export class ManagePlayerService {
  constructor(public dialogService: DialogService) {}

  changeMuteState(player: YouTubePlayer) {
    if (player.isMuted()) {
      player.unMute();
    } else {
      player.mute();
    }
  }

  initScriptIFrame() {
    // 2. This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  openFullScreenLogo(): DynamicDialogRef {
    return this.dialogService.open(NfFullscreenLogoComponent, {
      ...COMMON_CONFIG_DIALOG,
      baseZIndex: 10001,
      width: '100%',
      height: '100%',
      transitionOptions: '600ms',
    });
  }

  openFullScreenPlayer(data: any): DynamicDialogRef {
    return this.dialogService.open(NfFullscreenPlayerComponent, {
      ...COMMON_CONFIG_DIALOG,
      baseZIndex: 10000,
      width: '100%',
      height: '100%',
      transitionOptions: '600ms',
      data: data,
    });
  }

  openPreviewModalContainer(data: any): DynamicDialogRef {
    return this.dialogService.open(PreviewModalContainerComponent, {
      ...COMMON_CONFIG_DIALOG,
      baseZIndex: 10000,
      keepInViewport: true,
      data: data,
    });
  }
}
