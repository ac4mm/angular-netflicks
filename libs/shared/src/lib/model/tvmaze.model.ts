export interface CoverImage {
  id: string;
  type: 'poster' | 'banner' | 'background' | 'typography';
  main: boolean;
  resolutions: Resolutions;
}

export interface Resolutions {
  original: Original;
}

export interface Original {
  url: string;
  width: number;
  height: number;
}

export interface MainInfo {
  id: number;
  url?: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered?: Date;
  ended: null;
  officialSite?: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: null;
  dvdCountry: null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Schedule {
  time: string;
  days: string[];
}

export interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

// Generated with:https://app.quicktype.io/
export interface NumberSeasonDetail {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: Date;
  endDate: Date;
  network: NetworkNUmberSeason;
  webChannel: null;
  image: Image;
  summary: null | string;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface NetworkNUmberSeason {
  id: number;
  name: string;
  country: Country;
  officialSite: null;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface EpisodeDetail {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: Type;
  airdate: string;
  airtime: string;
  airstamp: Date | null;
  runtime: number | null;
  rating: Rating;
  image: Image | null;
  summary: null | string;
  _links: Links;
}

export interface Links {
  self: Self;
  show: Self;
}

export interface Self {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Rating {
  average: number | null;
}

export enum Type {
  Regular = 'regular',
}

export interface ValueEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: Type;
  airdate: string;
  airtime: string;
  airstamp: Date | null;
  runtime: number | null;
  rating: Rating;
  image: Image | null;
  summary: null | string;
  _links: Links;
}

export interface CastDetail {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

export interface Character {
  id: number;
  url: string;
  name: string;
  image: Image | null;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Person {
  id: number;
  url: string;
  name: string;
  country: Country | null;
  birthday: Date | null;
  deathday: null;
  gender: Gender;
  image: Image;
  updated: number;
  _links: Links;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}
