import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
];

export const AppRouting = RouterModule.forRoot(appRoutes);
