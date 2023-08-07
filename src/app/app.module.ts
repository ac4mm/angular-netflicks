import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from '@material/module';
import { LibsFeatureModule } from '@libs/feature';
import {
  SelectUserService,
  ManagePlayerService,
  SharedModule,
} from '@shared/netflicks';

@NgModule({
  declarations: [AppComponent],
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
