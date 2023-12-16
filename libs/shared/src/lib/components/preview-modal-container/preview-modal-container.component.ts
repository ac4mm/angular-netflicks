import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  of,
  takeUntil,
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
import { NgIf, NgFor, AsyncPipe, NgOptimizedImage } from '@angular/common';
import { NfCloseButtonComponent } from '../buttons/nf-close-button.component';

@Component({
  selector: 'nf-preview-modal-container',
  templateUrl: './preview-modal-container.component.html',
  styleUrl: './preview-modal-container.component.scss',
  standalone: true,
  imports: [
    NfCloseButtonComponent,
    NgIf,
    YouTubePlayerModule,
    NfAddButtonComponent,
    NfCheckButtonComponent,
    NfThumbUpButtonComponent,
    NfSpeakerupButtonComponent,
    NfSpeakerdownButtonComponent,
    NgFor,
    AsyncPipe,
    NgOptimizedImage,
  ],
})
export class PreviewModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: YouTubePlayer;

  @Input() seasonSelected = 1;
  @Input() showSpeakerUpIcon = true;
  @Input() showCheckIcon = true;

  seriesTvInfo$: Observable<{ key: number; value: ValueEpisode[] }[]>;
  seriesTvMainInfoDetail$: Observable<MainInfo>;
  finalArrayTvInfo$ = new BehaviorSubject<
    { key: number; value: ValueEpisode[] }[]
  >([]);
  seriesSelectedDropdown$ = new BehaviorSubject<number>(0);
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

  showVideoPreview = false;

  keyYTVideo: string;

  playerVars = {
    autoHide: 1,
    controls: 0,
    showInfo: 0,
    autoPlay: 1,
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

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private tvmazeService: TvMazeService,
    private themovieDbService: TheMovieDBService,
    public utilitiesService: UtilitiesService,
    private managePlayerService: ManagePlayerService
  ) {}

  ngOnInit() {
    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(
      this.showWords,
      this.utilitiesService.getRandomIntBetweenRange(2, 3)
    );

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(
      this.config.data.indexTvMazeSeries
    );
    this.seriesTvMainInfoDetail$ = this.tvmazeService.searchMainInfoMovie(
      this.config.data.indexTvMazeSeries
    );

    this.peopleCastSeries$ = this.getAllPeopleCastById$(
      this.config.data.indexTvMazeSeries
    );

    this.themovieDbService
      .getVideosById(this.config.data.indexTheMovieDb, 'tv')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.keyYTVideo = item?.['results'][0].key;

        setTimeout(() => {
          this.showVideoPreview = true;
          this.managePlayerService.initScriptIFrame();
        }, 3000);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickClose() {
    this.ref.close();
  }

  onClickSpeakerIcon() {
    if (!!this.player && this.player?.getPlayerState() === 1) {
      this.showSpeakerUpIcon = !this.showSpeakerUpIcon;

      this.managePlayerService.changeMuteState(this.player);
    }
  }

  onClickShowCheckIcon() {
    this.showCheckIcon = !this.showCheckIcon;
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

        this.finalArrayTvInfo$.next(
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
      })
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
    this.seasonSelected = index;

    //Index start from 0
    this.seriesSelectedDropdown$.next(index - 1);
  }
}
