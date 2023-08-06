import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LatestComponent } from '@latest/latest.component';
import { MyListComponent } from '@my-list/my-list.component';
import { PageNotFoundComponent } from '@page-not-found/page-not-found.component';
import { ReferfriendsComponent } from '@referfriends/referfriends.component';
import { KidsComponent } from '@kids/kids.component';

import { TvShowsComponent } from '@tv-shows/tv-shows.component';
import { MoviesComponent } from '@movies/movies.component';

import { MaterialModule } from '@material/module';

import { LibsFeatureModule } from '@libs/feature';
import {
  SelectUserService,
  ManagePlayerService,
  SharedModule,
} from '@shared/netflicks';

@NgModule({
  declarations: [
    AppComponent,
    TvShowsComponent,
    MoviesComponent,
    LatestComponent,
    MyListComponent,
    PageNotFoundComponent,
    MoviesComponent,
    ReferfriendsComponent,
    KidsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    LibsFeatureModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [SelectUserService, ManagePlayerService],
})
export class AppModule {}
