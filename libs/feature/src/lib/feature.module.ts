import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { KidsComponent } from './kids/kids.component';

import { LatestComponent } from './latest/latest.component';
import { MoviesComponent } from './movies/movies.component';
import { MyListComponent } from './my-list/my-list.component';
import { ReferfriendsComponent } from './referfriends/referfriends.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    RouterLinkActive,
    RouterLink,
    KidsComponent,
    LatestComponent,
    MoviesComponent,
    MyListComponent,
    ReferfriendsComponent,
    TvShowsComponent,
  ],
  exports: [
    KidsComponent,
    LatestComponent,
    MoviesComponent,
    MyListComponent,
    ReferfriendsComponent,
    TvShowsComponent,
  ],
})
export class FeatureModule {}
