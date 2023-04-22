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
  @Input() ratingNumberCover: any;
  @Input() numbersOfSeasonsKeepWatching: any;
  @Input() randMatchScore: any;
  @Input() speakerUpIconShow: any;
  @Input() checkIconShow: any;
  @Input() coverImagePreviewModal: any;
  @Input() displayModal: any;

  seriesTvInfo$: Observable<any>;
  seriesTvMainInfoDetail$: Observable<any>;
  finalArrayTvInfo$ = new BehaviorSubject<any>([]);
  seriesSelectedDropdown$ = new BehaviorSubject<number>(0);

  private destroy$ = new Subject<void>();

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private movies: MoviesService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.coverImagePreviewModal = this.config.data.coverImagePreviewModal;
    this.indexSelectedItem = this.config.data.indexSelectedItem;
    this.randMatchScore = this.config.data.randMatchScore;
    /* console.log(this.config.data.indexTvMazeSeries); */

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(this.config.data.indexTvMazeSeries);
    this.seriesTvMainInfoDetail$ = this.movies.searchMainInfoMovie(this.config.data.indexTvMazeSeries);

   /*  this.getAllPeopleCastById$(this.config.data.indexTvMazeSeries).subscribe((item) => {
      console.log(item);
    }) */
  }

  ngAfterViewInit() {
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

  definedArrayDropdownSeasons(size: number){
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

  getAllPeopleCastById$(coverIndexImg: number){
    let finalPeopleCast = [];

   /*  return this.movies.searchCastById(coverIndexImg).pipe(
      filter((items) => items.name)
    ) */

    return this.movies.searchCastById(coverIndexImg);
  }

  onSelect(item: any){
    console.log(item);
    this.seasonSelected = item;
    //Index start from 0
    this.seriesSelectedDropdown$.next(item - 1);
  }
}