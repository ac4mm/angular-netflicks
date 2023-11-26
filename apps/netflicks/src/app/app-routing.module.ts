import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'ManageProfiles',
    loadComponent: () =>
      import('@feature/manage-profiles/manage-profiles.component').then(
        (m) => m.ManageProfilesComponent
      ),
  },
  {
    path: 'browse',
    loadChildren: () =>
      import('@feature/home/home.routes').then((home) => home.HOME_ROUTES),
  },
  {
    path: 'tv-shows',
    loadComponent: () =>
      import('@feature/tv-shows/tv-shows.component').then(
        (m) => m.TvShowsComponent
      ),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('@feature/movies/movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: 'latest',
    loadComponent: () =>
      import('@feature/latest/latest.component').then((m) => m.LatestComponent),
  },
  {
    path: 'my-list',
    loadComponent: () =>
      import('@feature/my-list/my-list.component').then(
        (m) => m.MyListComponent
      ),
  },
  {
    path: 'Kids',
    loadComponent: () =>
      import('@feature/kids/kids.component').then((m) => m.KidsComponent),
  },
  {
    path: 'referfriends',
    loadComponent: () =>
      import('@feature/referfriends/referfriends.component').then(
        (m) => m.ReferfriendsComponent
      ),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('@feature/auth/auth.module').then((auth) => auth.AuthModule),
  },

  {
    path: 'not-found',
    loadComponent: () =>
      import('@feature/home/home.component').then((m) => m.HomeComponent),
  },
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
