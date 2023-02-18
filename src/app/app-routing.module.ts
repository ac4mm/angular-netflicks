import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LatestComponent } from './latest/latest.component';
import { MyListComponent } from './my-list/my-list.component';
import { KidsComponent } from './kids/kids.component';
import { ReferfriendsComponent } from './referfriends/referfriends.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { ManageProfilesComponent } from './manage-profiles/manage-profiles.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ManageProfiles', component: ManageProfilesComponent },
  {
    path: 'browse',
    loadChildren: () =>
      import('./home/home.module').then((home) => home.HomeModule),
  },
  { path: 'tv-shows', component: TvShowsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'my-list', component: MyListComponent },

  { path: 'Kids', component: KidsComponent },
  {
    path: 'referfriends',
    component: ReferfriendsComponent,
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((auth) => auth.AuthModule),
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
