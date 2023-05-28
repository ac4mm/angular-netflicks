import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LatestComponent } from '@latest/latest.component';
import { MyListComponent } from '@my-list/my-list.component';
import { PageNotFoundComponent } from '@page-not-found/page-not-found.component';
import { ReferfriendsComponent } from '@referfriends/referfriends.component';
import { KidsComponent } from '@kids/kids.component';

import { TvShowsComponent } from '@tv-shows/tv-shows.component';
import { MoviesComponent } from '@movies/movies.component';

import { SelectUserService } from '@shared/services/select-user.service';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TvShowsComponent,
    MoviesComponent,
    LatestComponent,
    MyListComponent,
    PageNotFoundComponent,
    MoviesComponent,
    ReferfriendsComponent,
    KidsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [SelectUserService],
})
export class AppModule { }
