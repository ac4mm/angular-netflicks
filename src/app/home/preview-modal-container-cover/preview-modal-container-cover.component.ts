import { Component, Input } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subject, concatMap, of } from "rxjs";

import { TvMazeService } from "@shared/services/tvmaze.service";
import { UtilitiesService } from "@shared/services/utilities.service";
import { TheMovieDBService } from "@shared/services/themoviedb.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'nf-preview-modal-container-cover',
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
  @Input() speakerUpIconShow: boolean = true;
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

  playerSettings: any;
  public YT: any;
  public videoId = 'QIZ9aZD6vs0';
  public playerCover: any;

  keyYTVideo: string;
  URLPlayerDialog: any;

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
    end: 5,
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
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.selectedRandWords = this.utilitiesService.getMultipleRandItem(this.showWords, this.utilitiesService.getRandomIntBetweenRange(2, 3));

    this.seriesTvInfo$ = this.getAllSeriesTvInfo$(this.config.data.indexTvMazeSeries);
    this.seriesTvMainInfoDetail$ = this.tvmazeService.searchMainInfoMovie(this.config.data.indexTvMazeSeries);

    this.peopleCastSeries$ = this.getAllPeopleCastById$(this.config.data.indexTvMazeSeries);



    this.themovieDbService.getVideosById(this.config.data.indexTheMovieDb, 'tv').subscribe((item) => {
      console.log(item);
      console.log(item?.["results"][0].key);
      this.keyYTVideo = item?.["results"][0].key;
      setTimeout(() => {
        this.showVideoPreview = true;
        this.URLPlayerDialog = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' +
          this.keyYTVideo +
          '?autohide=1&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;modestbranding=1&amp;disablekb=1&amp;rel=0&amp;fs=0&amp;playsinline=1&amp;loop=0&amp;end=15&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;enablejsapi=1&amp;widgetid=1'
        );
        console.log(this.config.data.indexSelectedItem);
        console.log(this.config.data.players);
        /* this.initScriptIFrame(); */
      }, 3000);
    })
  }

  initScriptIFrame() {
    // 2. This code loads the IFrame Player API code asynchronously.
    /* var scripts = document.getElementsByTagName("script");
    console.log(scripts); */
    const tag = document.createElement('script');
    let val = document.getElementById("iframe-api")?.getAttribute("src");

    /* let val = document.getElementById("iframe-api")?.getAttribute("src");

    if(document.getElementById("iframe-api")?.getAttribute("src")){
      console.log(document.getElementById("iframe-api"));
      document.body.removeChild(document.getElementById("iframe-api"));
    }
    console.log("val id:", val);

    tag.src = 'https://www.youtube.com/iframe_api';
    tag.id = 'iframe-api';
    console.log(document.body);
    document.body.appendChild(tag);
    window['onYouTubeIframeAPIReady'] = () => this.onYouTubeIframeAPIReady(this.keyYTVideo);
 */

    if (!val) {
      // if first run load the YT API which will call the correct functions.
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = 'iframe-api';
      console.log(document.body);
      document.body.appendChild(tag);

      window['onYouTubeIframeAPIReady'] = () => this.onYouTubeIframeAPIReady(this.keyYTVideo);
    } else {
      // if YT api already loaded, we need to call the function.
      this.onYouTubeIframeAPIReady(this.keyYTVideo);
    }
  }

  onYouTubeIframeAPIReady(videoId: string) {
    this.playerCover = new window['YT'].Player('player-dialog', {
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });

    /* if(document.getElementById("player-dialog")){
      document.getElementById("player-dialog").remove();
    }

    this.playerCover = new window['YT'].Player('player-dialog', {
      videoId: videoId,
      height: '100%',
      width: '100%',
      playerVars: {
        autohide: 1,
        controls: 0,
        showinfo: 0,
        autoplay: 1,
        modestbranding: 1,
        disablekb: 1,
        rel: 0,
        fs: 0,
        playsinline: 1,
        loop: 1,
        end: 5,
        origin: 'http://localhost:4200',
        enablejsapi: 1
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    }) */
    
  }

  onPlayerReady() {
    console.log("hey Im ready");
    //do whatever you want here. Like, player.playVideo();
  }

  onPlayerStateChange() {
    console.log("my state changed");
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
    /* console.log(this.playerCover);
    console.log(this.config.data.players[this.config.data.indexSelectedItem]); */
    let playerCover = this.config.data.players[this.config.data.indexSelectedItem];

    if (playerCover.isMuted()) {
      playerCover.unMute();
    } else {
      playerCover.mute();
    }
  }

  onClickShowCheckIcon() {
    this.showCheckIcon = !this.showCheckIcon;
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

  onChangeSeason(item: any) {
    const selectedSeries = item.value.code.substring(1, 2);
    //Index start from 0
    this.seriesSelectedDropdown$.next(selectedSeries - 1);
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