import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { FeatureModule } from '@feature/netflicks';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  TheMovieDBService,
  SelectUserService,
  ManagePlayerService,
} from '@shared/netflicks';
import { getAppConfigProvider } from '@config/netflicks';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(AppRoutingModule, FeatureModule),
      getAppConfigProvider(environment),
      TheMovieDBService,
      SelectUserService,
      ManagePlayerService,
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
    ],
  }).catch((err) => console.error(err));
});
