import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LibsFeatureModule } from '@libs/feature';
import {
  SelectUserService,
  ManagePlayerService,
  SharedModule,
  TheMovieDBService,
} from '@shared/netflicks';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LibsFeatureModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [TheMovieDBService, SelectUserService, ManagePlayerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private theMovieDbService: TheMovieDBService) {
    //Register API KEY TheMovieDB
    theMovieDbService.setEnvironment(environment.API_KEY_THEMOVIEDB);

    // register Swiper custom elements
    register();
  }
}
