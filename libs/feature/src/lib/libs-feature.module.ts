import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../../../../src/app/app-routing.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { KidsComponent } from './kids/kids.component';
import { SharedModule } from '@shared/netflicks';
import { LatestComponent } from './latest/latest.component';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [
    NavbarComponent,
    KidsComponent,
    LatestComponent,
    MoviesComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    SharedModule,
  ],
  exports: [NavbarComponent, KidsComponent, LatestComponent, MoviesComponent],
})
export class LibsFeatureModule {}
