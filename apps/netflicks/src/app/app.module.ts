import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { getAppConfigProvider } from '@config/netflicks';
import { environment } from '../environments/environment';
import { FeatureModule } from '@feature/netflicks';
import {
  SelectUserService,
  ManagePlayerService,
  SharedModule,
  TheMovieDBService,
} from '@shared/netflicks';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FeatureModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    getAppConfigProvider(environment),
    TheMovieDBService,
    SelectUserService,
    ManagePlayerService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    // register Swiper custom elements
    register();
  }
}
