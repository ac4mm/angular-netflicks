import { Observable, of } from 'rxjs';
import { ImageDetail } from '../model/themoviedb.model';

export class ThemoviedbServiceMock {
  getImagesById(): Observable<ImageDetail> {
    return of({ backdrops: [], id: 0, logos: [], posters: [] });
  }
}
