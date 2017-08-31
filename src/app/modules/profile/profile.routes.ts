import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';

const ordersRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  }
];

export const ProfileRouting = RouterModule.forChild(ordersRoutes);
