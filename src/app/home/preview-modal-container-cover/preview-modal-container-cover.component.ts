import { Component, Input } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subject, concatMap, filter, map, of, switchMap } from "rxjs";
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
  @Input() seasonSelected;
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
  numberSeasonsTvShow$ = new BehaviorSubject<number>(0);

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
    console.log(this.config.data.indexTvMazeSeries);

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(this.config.data.indexTvMazeSeries);
  }

  ngAfterViewInit() {
    this.numberSeasonsTvShow$.subscribe((item) => {
      this.seasonSelector = this.definedDropdownSeasons(item);
      
      //Select first item dropdown
      this.seasonSelected = this.seasonSelector[0];;;;
    })
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

        this.numberSeasonsTvShow$.next(finalArrayTvInfo.length);

        return of(finalArrayTvInfo);
      })
    );
  }

  definedDropdownSeasons(size: number) {
    let seasonSelector = [];
    for (let i = 1; i <= size; i++) {
      seasonSelector.push({ name: `Season ${i}`, code: `S${i}` },)
    }
    return seasonSelector;
  }
}