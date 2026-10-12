import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  model,
  resource,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, firstValueFrom } from 'rxjs';

import { TvMazeService } from '../../services/tvmaze.service';
import { UtilitiesService } from '../../services/utilities.service';
import { TheMovieDBService } from '../../services/themoviedb.service';
import { ManagePlayerService } from '../../services/manage-player.service';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import {
  CastDetail,
  EpisodeDetail,
  MainInfo,
} from '../../model/tvmaze.model';
import { VideoDetail } from '../../model/themoviedb.model';
import { NfSpeakerdownButtonComponent } from '../buttons/nf-speakerdown-button.component';
import { NfSpeakerupButtonComponent } from '../buttons/nf-speakerup-button.component';
import { NfThumbUpButtonComponent } from '../buttons/nf-thumb-up-button.component';
import { NfCheckButtonComponent } from '../buttons/nf-check-button.component';
import { NfAddButtonComponent } from '../buttons/nf-add-button.component';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { NfCloseButtonComponent } from '../buttons/nf-close-button.component';
import { PreviewModalDialogData } from '../../model/common-config-dialog.model';

@Component({
  selector: 'nf-preview-modal-container',
  templateUrl: './preview-modal-container.component.html',
  styleUrl: './preview-modal-container.component.scss',
  standalone: true,
  imports: [
    NfCloseButtonComponent,
    YouTubePlayerModule,
    NfAddButtonComponent,
    NfCheckButtonComponent,
    NfThumbUpButtonComponent,
    NfSpeakerupButtonComponent,
    NfSpeakerdownButtonComponent,
    AsyncPipe,
    NgOptimizedImage,
  ],
})
export class PreviewModalContainerComponent implements OnInit {
  config = inject(DynamicDialogConfig<PreviewModalDialogData>);
  ref = inject(DynamicDialogRef);
  private tvmazeService = inject(TvMazeService);
  private themovieDbService = inject(TheMovieDBService);
  utilitiesService = inject(UtilitiesService);
  private managePlayerService = inject(ManagePlayerService);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @ViewChild('player') player: YouTubePlayer;

  playerWidth = signal(0);
  playerHeight = signal(0);

  seasonSelected = model(1);
  showSpeakerUpIcon = model(true);
  showCheckIcon = model(true);

  seriesTvMainInfoResource = resource<MainInfo, undefined>({
    loader: () =>
      firstValueFrom(
        this.tvmazeService.searchMainInfoMovie(
          this.config.data.indexTvMazeSeries
        )
      ),
  });
  seriesEpisodesResource = resource<EpisodeDetail[], undefined>({
    loader: () =>
      firstValueFrom(
        this.tvmazeService.searchEpisodesById(
          this.config.data.indexTvMazeSeries
        )
      ),
  });
  seriesCastResource = resource<CastDetail[], undefined>({
    loader: () =>
      firstValueFrom(
        this.tvmazeService.searchCastById(this.config.data.indexTvMazeSeries)
      ),
  });
  seriesTvMainInfoDetail = computed(() =>
    this.seriesTvMainInfoResource.hasValue()
      ? this.seriesTvMainInfoResource.value()
      : undefined
  );
  seriesTvInfo = computed(() => {
    if (!this.seriesEpisodesResource.hasValue()) {
      return undefined;
    }
    const episodes = this.seriesEpisodesResource.value();

    const episodesBySeason = this.utilitiesService.groupBy(
      episodes,
      (episode) => episode.season
    );
    return Array.from(episodesBySeason, ([key, value]) => ({ key, value }));
  });
  peopleCastSeries = computed(() => {
    if (!this.seriesCastResource.hasValue()) {
      return undefined;
    }
    const cast = this.seriesCastResource.value();
    return [...new Set(cast.map((item) => item.person.name))];
  });
  numbersOfSeasonsKeepWatching$: Observable<number[][]>;
  finalArrayTvInfo = computed(() => this.seriesTvInfo() ?? []);
  seriesSelectedDropdown = signal(0);

  showWords = [
    'Absurd',
    'Quirky',
    'Irreverent',
    'Ominous',
    'Scary',
    'Mind-Bending',
    'Chilling',
    'Suspenseful',
    'Exciting',
    'Dark',
    'Offbeat',
    'Gritty',
    'Emotional',
    'Deadpan',
    'Witty',
  ];
  selectedRandWords: string[];

  isSeasonDropdownOpen = signal(false);

  showVideoPreview = signal(false);

  keyYTVideo = signal<string | undefined>(undefined);
  videoResource = httpResource<VideoDetail>(() =>
    this.themovieDbService.getVideosUrl(
      this.config.data.indexTheMovieDb,
      'tv'
    )
  );

  playerVars = {
    autoHide: 1,
    controls: 0,
    showInfo: 0,
    autoplay: 1,
    modestbranding: 1,
    disablekb: 1,
    rel: 0,
    fs: 0,
    playsinline: 1,
    loop: 0,
    mute: 0,
    allowfullscreen: 1,
    frameBorder: 0,
  };

  constructor() {
    effect(() => {
      if (!this.videoResource.hasValue()) {
        return;
      }
      const video = this.videoResource.value();

      this.keyYTVideo.set(video.results[0]?.key);
      setTimeout(() => {
        this.updatePlayerDimensions();
        this.showVideoPreview.set(true);
        this.managePlayerService.initScriptIFrame();
      }, 3000);
    });
  }

  ngOnInit() {
    this.numbersOfSeasonsKeepWatching$ =
      this.config.data.numbersOfSeasonsKeepWatching$;

    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(
      this.showWords,
      this.utilitiesService.getRandomIntBetweenRange(2, 3)
    );

  }

  @HostListener('window:resize')
  updatePlayerDimensions(): void {
    const container = this.elementRef.nativeElement.querySelector<HTMLElement>(
      '.previewModal-player-image'
    );
    const width = container?.clientWidth || 650;
    this.playerWidth.set(width);
    this.playerHeight.set(Math.round((width * 9) / 16));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeSeasonDropdown();
    }
  }

  toggleSeasonDropdown(event?: Event) {
    event?.stopPropagation();
    this.isSeasonDropdownOpen.update((isOpen) => !isOpen);
  }

  closeSeasonDropdown() {
    this.isSeasonDropdownOpen.set(false);
  }

  onClickClose() {
    this.ref.close();
  }

  onClickSpeakerIcon() {
    if (!!this.player && this.player?.getPlayerState() === 1) {
      this.showSpeakerUpIcon.update((show) => !show);

      this.managePlayerService.changeMuteState(this.player);
    }
  }

  onSpeakerToggleKeydown(event: KeyboardEvent) {
    if (event.target !== event.currentTarget) {
      return;
    }

    event.preventDefault();
    this.onClickSpeakerIcon();
  }

  onClickShowCheckIcon(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.showCheckIcon.update((show) => !show);
  }

  playVideo() {
    if (this.player) {
      this.player.pauseVideo();
    }

    this.managePlayerService.openFullScreenPlayer({
      indexTheMovieDb: this.config.data.indexTheMovieDb,
    });
  }

  definedArrayDropdownSeasons(size: number) {
    const seasonSelector: number[] = [];
    for (let i = 1; i <= size; i++) {
      seasonSelector.push(i);
    }
    return seasonSelector;
  }

  getMoreCastPeople(peopleCast: string, index: number) {
    if (index > 2) {
      return;
    }
    return peopleCast + ',';
  }

  onClickScrollToMore() {
    document.getElementById('more')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  onSelectSeason(index: number) {
    this.seasonSelected.set(index);
    this.closeSeasonDropdown();

    //Index start from 0
    this.seriesSelectedDropdown.set(index - 1);
  }
}
