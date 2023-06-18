import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export type TypeShow = 'movie' | 'tv';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {

  API_KEY_THEMOVIEDB: string;
  BASEPATH: string = 'https://api.themoviedb.org/3';

  BASEPATHIMAGE: string = 'https://image.tmdb.org/t/p/original/';

  constructor(public http: HttpClient) { 
    this.API_KEY_THEMOVIEDB = environment.API_KEY_THEMOVIEDB;
  }

  getTvMovieDetailById(movieId: number, typeShow: TypeShow = 'movie') {
    return this.http.get(this.BASEPATH + '/'+ typeShow + '/' + movieId + '?api_key=' + this.API_KEY_THEMOVIEDB).pipe(map((res) => res))
  }

  getImagesById(movieId: number, typeShow: TypeShow = 'movie') {
    return this.http.get(this.BASEPATH + '/'+ typeShow + '/' + movieId + '/images?api_key=' + this.API_KEY_THEMOVIEDB).pipe(map((res) => res))
  }

  getVideosById(movieId: number, typeShow: TypeShow = 'movie') {
    return this.http.get(this.BASEPATH + '/'+ typeShow + '/' + movieId + '/videos?api_key=' + this.API_KEY_THEMOVIEDB).pipe(map((res) => res))
  }
}