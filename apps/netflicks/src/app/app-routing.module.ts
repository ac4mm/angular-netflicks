import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ManageProfilesComponent } from '@feature/manage-profiles/manage-profiles.component';
import { TvShowsComponent } from '@feature/tv-shows/tv-shows.component';
import { MoviesComponent } from '@feature/movies/movies.component';
import { LatestComponent } from '@feature/latest/latest.component';
import { MyListComponent } from '@feature/my-list/my-list.component';
import { KidsComponent } from '@feature/kids/kids.component';
import { ReferfriendsComponent } from '@feature/referfriends/referfriends.component';
import { HomeComponent } from '@feature/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ManageProfiles', component: ManageProfilesComponent },
  {
    path: 'browse',
    loadChildren: () =>
      import('@feature/home/home.module').then((home) => home.HomeModule),
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
      import('@feature/auth/auth.module').then((auth) => auth.AuthModule),
  },

  { path: 'not-found', component: HomeComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
