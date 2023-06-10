import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  API_KEY_YOUTUBE: string;
  BASEPATH: string = 'https://www.googleapis.com/youtube/v3/';

  constructor(public http: HttpClient) {
    this.API_KEY_YOUTUBE = environment.API_KEY_THEMOVIEDB;
   }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let URL = this.BASEPATH + 'search?key=' + this.API_KEY_YOUTUBE + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(URL)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideosBySearchQuery(query: string) {
    let URL = this.BASEPATH + 'search?key=' + this.API_KEY_YOUTUBE + '&q=' + query + '&part=snippet &type=video'
    return this.http.get(URL)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideoById(idVideo: string) {
    const URL = this.BASEPATH + 'videos?part=snippet&id=' + idVideo + '&key=' + this.API_KEY_YOUTUBE;

    return this.http.get(URL).pipe(map((res) => {
      return res;
    }))
  }
}