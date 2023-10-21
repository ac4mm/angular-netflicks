import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CastDetail,
  EpisodeDetail,
  CoverImage,
  MainInfo,
  NumberSeasonDetail,
} from '../model/tvmaze.model';

@Injectable({ providedIn: 'root' })
export class TvMazeService {
  private basePath = 'https://api.tvmaze.com';
  constructor(private httpClient: HttpClient) {}

  getMovies(id: string) {
    return this.httpClient.get(`${this.basePath}/shows/${id}`);
  }

  getEpisodeByNumber(id: string, season: string, numb: string) {
    return this.httpClient.get(
      `${this.basePath}/shows/${id}/episodebynumber?season=${season}&number=${numb}`
    );
  }

  searchMovie(query: string) {
    return this.httpClient.get(`${this.basePath}/search/shows?q=:${query}`);
  }

  searchImagesMovie(id: number): Observable<CoverImage[]> {
    return this.httpClient.get<CoverImage[]>(
      `${this.basePath}/shows/${id}/images`
    );
  }

  searchMainInfoMovie(id: number): Observable<MainInfo> {
    return this.httpClient.get<MainInfo>(`${this.basePath}/shows/${id}`).pipe(
      map((item) => {
        console.log(item);
        return item;
      })
    );
  }

  searchNumberSeasonsById(id: number): Observable<NumberSeasonDetail[]> {
    return this.httpClient.get<NumberSeasonDetail[]>(
      `${this.basePath}/shows/${id}/seasons`
    );
  }

  searchEpisodesById(id: number): Observable<EpisodeDetail[]> {
    return this.httpClient
      .get<EpisodeDetail[]>(`${this.basePath}/shows/${id}/episodes`)
      .pipe(map((item) => item as EpisodeDetail[]));
  }

  searchCastById(id: number): Observable<CastDetail[]> {
    return this.httpClient
      .get<CastDetail[]>(`${this.basePath}/shows/${id}/cast`)
      .pipe(map((item) => item as CastDetail[]));
  }
}
