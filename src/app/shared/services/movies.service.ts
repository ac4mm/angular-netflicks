import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesMovie, MainInfo } from 'src/app/shared/model/images-movie.model';


@Injectable({ providedIn: 'root' })
export class MoviesService {
  private basePath = 'https://api.tvmaze.com';
  constructor(private httpClient: HttpClient) { }

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

  searchImagesMovie(id: number): Observable<ImagesMovie[]> {
    return this.httpClient.get<ImagesMovie[]>(`${this.basePath}/shows/${id}/images`);
  }

  searchMainInfoMovie(id: number) {
    return this.httpClient.get<MainInfo>(`${this.basePath}/shows/${id}`);
  }

  searchNumberSeasonsById(id: number) {
    return this.httpClient.get<any>(`${this.basePath}/shows/${id}/seasons`);
  }

  searchEpisodesById(id: number) {
    return this.httpClient.get<any>(`${this.basePath}/shows/${id}/episodes`);
  }
}
