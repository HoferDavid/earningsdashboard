import { Routes } from '@angular/router';
import { InfoComponent } from './components/pages/info/info.component';
import { FavoritesComponent } from './components/pages/favorites/favorites.component';
import { ImprintComponent } from './components/pages/info/imprint/imprint.component';
import { OverviewComponent } from './components/pages/overview/overview.component';
import { BoardComponent } from './components/pages/board/board.component';
import { MagsevenComponent } from './components/pages/magseven/magseven.component';
import { DoppelgaengerComponent } from './components/pages/info/doppelgaenger/doppelgaenger.component';
import { DisclaimerComponent } from './components/pages/info/disclaimer/disclaimer.component';
import { PrivacyComponent } from './components/pages/info/privacy/privacy.component';
import { AboutComponent } from './components/pages/info/about/about.component';
import { CommunityComponent } from './components/pages/community/community.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'magseven',
    component: MagsevenComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'community',
    component: CommunityComponent,
  },
  {
    path: 'board/:ticker',
    component: BoardComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
    children: [
      {
        path: 'doppelgaenger',
        component: DoppelgaengerComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'disclaimer',
        component: DisclaimerComponent,
      },
      {
        path: 'imprint',
        component: ImprintComponent,
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
      },
    ],
  },
];
