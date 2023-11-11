import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { KidsComponent } from './kids/kids.component';
import { SharedModule } from '@shared/netflicks';
import { LatestComponent } from './latest/latest.component';
import { MoviesComponent } from './movies/movies.component';
import { MyListComponent } from './my-list/my-list.component';
import { ReferfriendsComponent } from './referfriends/referfriends.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    KidsComponent,
    LatestComponent,
    MoviesComponent,
    MyListComponent,
    ReferfriendsComponent,
    TvShowsComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    HomeModule,
    SharedModule,
    RouterLinkActive,
    RouterLink,
  ],
  exports: [
    NavbarComponent,
    KidsComponent,
    LatestComponent,
    MoviesComponent,
    MyListComponent,
    ReferfriendsComponent,
    TvShowsComponent,
  ],
})
export class FeatureModule {}