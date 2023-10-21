import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type TypeShow = 'movie' | 'tv';

@Injectable({
  providedIn: 'root',
})
export class TheMovieDBService {
  BASEPATH = 'https://api.themoviedb.org/3';
  private _environment: string;

  constructor(public http: HttpClient) {}

  setEnvironment(environment: string) {
    this._environment = environment;
  }

  getEnvironment() {
    return this._environment;
  }

  getTvMovieDetailById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<any> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '?api_key=' +
          this.getEnvironment()
      )
      .pipe(map((res) => res));
  }

  getImagesById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<any> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '/images?api_key=' +
          this.getEnvironment()
      )
      .pipe(map((res) => res));
  }

  getVideosById(
    movieId: number,
    typeShow: TypeShow = 'movie'
  ): Observable<any> {
    return this.http
      .get(
        this.BASEPATH +
          '/' +
          typeShow +
          '/' +
          movieId +
          '/videos?api_key=' +
          this.getEnvironment()
      )
      .pipe(map((res) => res));
  }
}
