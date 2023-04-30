import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  APIKEY: string = 'AIzaSyBe4OamkgHdFcTeBNu0t8h_LhxSDmG-q5M';

  constructor(public http: HttpClient) { }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let URL = 'https://www.googleapis.com/youtube/v3/search?key=' + this.APIKEY + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(URL)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideosBySearchQuery(query: string) {
    let URL = 'https://www.googleapis.com/youtube/v3/search?key=' + this.APIKEY + '&q=' + query + '&part=snippet &type=video'
    return this.http.get(URL)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideoById(idVideo: string) {
    const URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + idVideo + '&key=' + this.APIKEY;

    return this.http.get(URL).pipe(map((res) => {
      return res;
    }))
  }
}