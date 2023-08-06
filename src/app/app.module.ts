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
import { ManagePlayerService } from '@shared/services/manage-player.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
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
  providers: [SelectUserService, ManagePlayerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(){
    // register Swiper custom elements
    register();
  }
 }
