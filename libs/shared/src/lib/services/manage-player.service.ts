import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Injectable()
export class ManagePlayerService {
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
}
