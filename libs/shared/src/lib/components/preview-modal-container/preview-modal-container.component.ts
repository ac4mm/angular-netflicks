import { ChangeDetectionStrategy, model, signal } from '@angular/core';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  Observable,
  Subject,
  concatMap,
  of,
  takeUntil,
  shareReplay,
} from 'rxjs';

import { TvMazeService } from '../../services/tvmaze.service';
import { UtilitiesService } from '../../services/utilities.service';
import { TheMovieDBService } from '../../services/themoviedb.service';
import { ManagePlayerService } from '../../services/manage-player.service';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { MainInfo, ValueEpisode } from '../../model/tvmaze.model';
import { NfSpeakerdownButtonComponent } from '../buttons/nf-speakerdown-button.component';
import { NfSpeakerupButtonComponent } from '../buttons/nf-speakerup-button.component';
import { NfThumbUpButtonComponent } from '../buttons/nf-thumb-up-button.component';
import { NfCheckButtonComponent } from '../buttons/nf-check-button.component';
import { NfAddButtonComponent } from '../buttons/nf-add-button.component';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { NfCloseButtonComponent } from '../buttons/nf-close-button.component';
import { PreviewModalDialogData } from '../../model/common-config-dialog.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PreviewModalContainerComponent implements OnInit, OnDestroy {
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

  seriesTvInfo$: Observable<{ key: number; value: ValueEpisode[] }[]>;
  seriesTvMainInfoDetail$: Observable<MainInfo>;
  numbersOfSeasonsKeepWatching$: Observable<number[][]>;
  finalArrayTvInfo = signal<{ key: number; value: ValueEpisode[] }[]>([]);
  seriesSelectedDropdown = signal(0);
  peopleCastSeries$: Observable<string[]>;

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

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.updatePlayerDimensions();
    this.numbersOfSeasonsKeepWatching$ =
      this.config.data.numbersOfSeasonsKeepWatching$;

    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(
      this.showWords,
      this.utilitiesService.getRandomIntBetweenRange(2, 3)
    );

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(
      this.config.data.indexTvMazeSeries
    );
    this.seriesTvMainInfoDetail$ = this.tvmazeService
      .searchMainInfoMovie(this.config.data.indexTvMazeSeries)
      .pipe(shareReplay(1));

    this.peopleCastSeries$ = this.getAllPeopleCastById$(
      this.config.data.indexTvMazeSeries
    );

    this.themovieDbService
      .getVideosById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.keyYTVideo.set(item?.['results'][0].key);

        setTimeout(() => {
          this.showVideoPreview.set(true);
          this.managePlayerService.initScriptIFrame();
        }, 3000);
      });
  }

  @HostListener('window:resize')
  updatePlayerDimensions(): void {
      this.playerWidth.set(Math.max(window.innerWidth, 1920));
      this.playerHeight.set(Math.max(window.innerHeight, 1080));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  onClickShowCheckIcon(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.showCheckIcon.update((show) => !show);
  }

  playVideo() {
    if (this.player) {
      this.player.pauseVideo();
    }

    const dialogFullScreenPlayer: DynamicDialogRef =
      this.managePlayerService.openFullScreenPlayer({
        indexTheMovieDb: this.config.data.indexTheMovieDb,
      });
  }

  getAllSeriesTvInfo$(
    coverIndexImg: number
  ): Observable<{ key: number; value: ValueEpisode[] }[]> {
    const finalSeriesTvInfo: Map<any, any>[] = [];

    return this.tvmazeService.searchEpisodesById(coverIndexImg).pipe(
      concatMap((items) => {
        const mapGroupBySeason: Map<any, any> = this.utilitiesService.groupBy(
          items,
          (item: { season: number }) => item.season
        );
        finalSeriesTvInfo.push(mapGroupBySeason);

        const finalArrayTvInfo: { key: any; value: any }[] = Array.from(
          finalSeriesTvInfo[0],
          ([key, value]) => ({ key, value })
        );

        this.finalArrayTvInfo.set(
          finalArrayTvInfo as { key: number; value: ValueEpisode[] }[]
        );

        return of(finalArrayTvInfo);
      })
    );
  }

  definedArrayDropdownSeasons(size: number) {
    const seasonSelector: number[] = [];
    for (let i = 1; i <= size; i++) {
      seasonSelector.push(i);
    }
    return seasonSelector;
  }

  getAllPeopleCastById$(coverIndexImg: number): Observable<string[]> {
    return this.tvmazeService.searchCastById(coverIndexImg).pipe(
      concatMap((items) => {
        //Used Set to remove duplicate
        return of([
          ...new Set(
            items.map((item: { person: { name: any } }) => item.person.name)
          ),
        ] as string[]);
      }),
      shareReplay(1)
    );
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
