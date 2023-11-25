import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ImageDetail,
  MovieDetail,
  VideoDetail,
} from '../model/themoviedb.model';
import { APP_CONFIG, AppConfig } from '@config/netflicks';

export type TypeShow = 'movie' | 'tv';

@Injectable({
  providedIn: 'root',
})
export class TheMovieDBService {
  BASEPATH = 'https://api.themoviedb.org/3';

  constructor(
    public http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  getTvMovieDetailById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<MovieDetail> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '?api_key=' +
          this.appConfig.API_KEY_THEMOVIEDB
      )
      .pipe(map((res) => res as MovieDetail));
  }

  getImagesById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<ImageDetail> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '/images?api_key=' +
          this.appConfig.API_KEY_THEMOVIEDB
      )
      .pipe(map((res) => res as ImageDetail));
  }

  getVideosById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<VideoDetail> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '/videos?api_key=' +
          this.appConfig.API_KEY_THEMOVIEDB
      )
      .pipe(map((res) => res as VideoDetail));
  }
}
