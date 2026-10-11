import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ImageDetail,
  MovieDetail,
  VideoDetail,
} from '../model/themoviedb.model';
import { APP_CONFIG, AppConfig } from '@config/netflicks';

export type TypeShow = 'movie' | 'tv';

@Service()
export class TheMovieDBService {
  http = inject(HttpClient);
  private appConfig = inject<AppConfig>(APP_CONFIG);

  BASEPATH = 'https://api.themoviedb.org/3';

  getTvMovieDetailUrl(movieId: number, typeShow: TypeShow = 'movie'): string {
    return `${this.BASEPATH}/${typeShow}/${movieId}?api_key=${this.appConfig.API_KEY_THEMOVIEDB}`;
  }

  getImagesUrl(movieId: number, typeShow: TypeShow = 'movie'): string {
    return `${this.BASEPATH}/${typeShow}/${movieId}/images?api_key=${this.appConfig.API_KEY_THEMOVIEDB}`;
  }

  getVideosUrl(movieId: number, typeShow: TypeShow = 'movie'): string {
    return `${this.BASEPATH}/${typeShow}/${movieId}/videos?api_key=${this.appConfig.API_KEY_THEMOVIEDB}`;
  }

  getTvMovieDetailById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<MovieDetail> {
    return this.http
      .get(this.getTvMovieDetailUrl(movieId, typeShow))
      .pipe(map((res) => res as MovieDetail));
  }

  getImagesById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<ImageDetail> {
    return this.http
      .get(this.getImagesUrl(movieId, typeShow))
      .pipe(map((res) => res as ImageDetail));
  }

  getVideosById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<VideoDetail> {
    return this.http
      .get(this.getVideosUrl(movieId, typeShow))
      .pipe(map((res) => res as VideoDetail));
  }
}
