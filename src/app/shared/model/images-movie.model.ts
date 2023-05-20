export interface ImagesMovie {
  id: string;
  type: 'poster' | 'banner' | 'background' | 'typography';
  main: boolean;
  resolutions: any;
}

export type ResolutionsImageMovie = {
  original: ResolutionImage;
  medium: ResolutionImage;
}

export type ResolutionImage  = {
  url: string;
  width: number;
  height: number;
}

export interface MainInfo {
  id: number,
  url?: string;
  name: string;
  type: string;
  language: string;
  genres: any[];
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered?: Date;
  officialSite?: string;
}