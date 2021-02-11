import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class MoviesService {
  private basePath = 'http://api.tvmaze.com';
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

  searchImagesMovie(id: number) {
    return this.httpClient.get(`${this.basePath}/shows/${id}/images`);
  }
}
