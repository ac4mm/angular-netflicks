import { Component, Input, ViewChild } from "@angular/core";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subject, concatMap, of, takeUntil } from "rxjs";

import { TvMazeService } from "@shared/services/tvmaze.service";
import { UtilitiesService } from "@shared/services/utilities.service";
import { TheMovieDBService } from "@shared/services/themoviedb.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ManagePlayerService } from "@shared/services/manage-player.service";
import { NfFullscreenPlayerComponent } from "@shared/components/fullscreen-player/nf-fullscreen-player.component";

@Component({
  selector: 'nf-preview-modal-container',
  templateUrl: './preview-modal-container.component.html',
  styleUrls: [
    './preview-modal-container.component.scss',
    '../home.component.scss',
    '../footer/footer.component.scss'
  ],
  providers: [UtilitiesService]
})
export class PreviewModalContainer {
  @ViewChild('player') player: any;

  @Input() seasonSelected: number = 1;
  @Input() seasonSelector: any = [];
  @Input() showSpeakerUpIcon: boolean = true;
  @Input() showCheckIcon: boolean = true;
  @Input() displayModal: any;

  seriesTvInfo$: Observable<any>;
  seriesTvMainInfoDetail$: Observable<any>;
  finalArrayTvInfo$ = new BehaviorSubject<any>([]);
  seriesSelectedDropdown$ = new BehaviorSubject<number>(0);
  peopleCastSeries$: Observable<string[]>;

  showWords = ['Absurd', 'Quirky', 'Irreverent', 'Ominous', 'Scary', 'Mind-Bending', 'Chilling', 'Suspenseful', 'Exciting', 'Dark', 'Offbeat', 'Gritty', 'Emotional', 'Deadpan', 'Witty'];
  selectedRandWords: string[];

  showVideoPreview: boolean = false;

  keyYTVideo: string;

  playerConfig = {
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
    end: 35,
    mute: 0,
    autoplay: 1,
    allowfullscreen: 1,
    frameBorder: 0
  };

  private destroy$ = new Subject<void>();

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private tvmazeService: TvMazeService,
    private themovieDbService: TheMovieDBService,
    public utilitiesService: UtilitiesService,
    public sanitizer: DomSanitizer,
    private managePlayerService: ManagePlayerService,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(this.showWords, this.utilitiesService.getRandomIntBetweenRange(2, 3));

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(this.config.data.indexTvMazeSeries);
    this.seriesTvMainInfoDetail$ = this.tvmazeService.searchMainInfoMovie(this.config.data.indexTvMazeSeries);

    this.peopleCastSeries$ = this.getAllPeopleCastById$(this.config.data.indexTvMazeSeries);



    this.themovieDbService.getVideosById(this.config.data.indexTheMovieDb, 'tv').pipe(takeUntil(this.destroy$)).subscribe((item) => {
      this.keyYTVideo = item?.["results"][0].key;

      setTimeout(() => {
        this.showVideoPreview = true;
        this.managePlayerService.initScriptIFrame();
      }, 3000);
    })
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
    if (!!this.player) {
      this.player.pauseVideo();
    }

    const dialogFullScreenPlayer: DynamicDialogRef = this.dialogService.open(NfFullscreenPlayerComponent, {
      baseZIndex: 10000,
      modal: true,
      draggable: false,
      dismissableMask: true,
      showHeader: false,
      closeOnEscape: true,
      width: '100%',
      height: '100%',
      transitionOptions: '600ms',
      data: {
        indexTheMovieDb: this.config.data.indexTheMovieDb,
      }
    })
  }

  getAllSeriesTvInfo$(coverIndexImg: number) {
    let finalSeriesTvInfo = [];

    return this.tvmazeService.searchEpisodesById(coverIndexImg).pipe(
      concatMap((items) => {
        const mapGroupBySeason = this.utilitiesService.groupBy(items, item => item.season);
        finalSeriesTvInfo.push(mapGroupBySeason);

        let finalArrayTvInfo = Array.from(finalSeriesTvInfo[0], ([key, value]) => ({ key, value }));

        this.finalArrayTvInfo$.next(finalArrayTvInfo);

        return of(finalArrayTvInfo);
      })
    );
  }

  definedArrayDropdownSeasons(size: number) {
    let seasonSelector = [];
    for (let i = 1; i <= size; i++) {
      seasonSelector.push(i)
    }
    return seasonSelector;
  }

  getAllPeopleCastById$(coverIndexImg: number) {

    return this.tvmazeService.searchCastById(coverIndexImg).pipe(
      concatMap((items) => {
        //Used Set to remove duplicate
        return of([...new Set(items.map((item) => item.person.name))] as string[]);
      })
    );
  }

  getMoreCastPeople(peopleCast: string, index: number) {
    if (index > 2) {
      return;
    }
    return peopleCast + ",";
  }

  onClickScrollToMore() {
    document.getElementById("more").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  onSelectSeason(index: number) {
    this.seasonSelected = index;

    //Index start from 0
    this.seriesSelectedDropdown$.next(index - 1);
  }
}
