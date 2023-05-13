import { Component, Input } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subject, concatMap, filter, of, takeUntil } from "rxjs";
import { MoviesService } from "src/app/shared/services/movies.service";
import { UtilitiesService } from "src/app/shared/services/utilities.service";

@Component({
  selector: 'app-preview-modal-container-cover',
  templateUrl: './preview-modal-container-cover.component.html',
  styleUrls: [
    './preview-modal-container-cover.component.scss',
    '../home.component.scss'
  ],
  providers: [UtilitiesService]
})
export class PreviewModalContainerCover {
  @Input() seasonSelected: number = 1;
  @Input() seasonSelector: any = [];
  @Input() indexSelectedItem: any;
  @Input() numbersOfSeasonsKeepWatching$: Observable<string[]>;
  @Input() randMatchScore: any;
  @Input() ratingNumberCover: any;
  @Input() speakerUpIconShow: any;
  @Input() checkIconShow: any;
  @Input() coverImagePreviewModal: any;
  @Input() displayModal: any;

  seriesTvInfo$: Observable<any>;
  seriesTvMainInfoDetail$: Observable<any>;
  finalArrayTvInfo$ = new BehaviorSubject<any>([]);
  seriesSelectedDropdown$ = new BehaviorSubject<number>(0);
  peopleCastSeries$: Observable<string[]>;

  logoImageURL: string = null;

  showWords = ['Absurd', 'Quirky', 'Irreverent', 'Ominous', 'Scary', 'Mind-Bending', 'Chilling', 'Suspenseful', 'Exciting', 'Dark', 'Offbeat', 'Gritty', 'Emotional', 'Deadpan', 'Witty'];
  selectedRandWords: string[];

  private destroy$ = new Subject<void>();

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private movies: MoviesService,
    public utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.coverImagePreviewModal = this.config.data.coverImagePreviewModal;
    this.logoImageURL = this.config.data.logoImageURL;
    this.indexSelectedItem = this.config.data.indexSelectedItem;
    this.randMatchScore = this.config.data.randMatchScore;
    this.ratingNumberCover = this.config.data.ratingNumberCover;
    this.numbersOfSeasonsKeepWatching$ = this.config.data.numbersOfSeasonsKeepWatching$;

    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(this.showWords, this.utilitiesService.getRandomIntBetweenRange(2, 3));

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(this.config.data.indexTvMazeSeries);
    this.seriesTvMainInfoDetail$ = this.movies.searchMainInfoMovie(this.config.data.indexTvMazeSeries);

    this.peopleCastSeries$ = this.getAllPeopleCastById$(this.config.data.indexTvMazeSeries);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickClose() {
    this.ref.close();
  }

  onClickSpeakerIcon() {
    this.speakerUpIconShow = !this.speakerUpIconShow;
  }

  onClickCheckIcon() {
    this.checkIconShow = !this.checkIconShow;
  }

  getAllSeriesTvInfo$(coverIndexImg: number) {
    let finalSeriesTvInfo = [];

    return this.movies.searchEpisodesById(coverIndexImg).pipe(
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

  onChangeSeason(item: any) {
    const selectedSeries = item.value.code.substring(1, 2);
    //Index start from 0
    this.seriesSelectedDropdown$.next(selectedSeries - 1);
  }

  getAllPeopleCastById$(coverIndexImg: number) {

    return this.movies.searchCastById(coverIndexImg).pipe(
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