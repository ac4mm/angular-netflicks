import { Observable } from 'rxjs';

export interface PreviewModalDialogData {
  randMatchScore: number[];
  ratingNumberCover: (string | undefined)[];
  numbersOfSeasonsKeepWatching$: Observable<number[][]>;
  coverImagePreviewModal: string;
  indexSelectedItem: number;
  indexTvMazeSeries: number;
  indexTheMovieDb: number;
  logoImageURL?: string;
}

export const COMMON_CONFIG_DIALOG = {
  modal: true,
  draggable: false,
  dismissableMask: true,
  showHeader: false,
  closeOnEscape: true,
  keepInViewport: true,
};

export const COMMON_CONFIG_FULLSCREEN = {
  width: '100%',
  height: '100%',
  transitionOptions: '600ms',
};
