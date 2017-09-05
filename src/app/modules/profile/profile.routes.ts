import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {PasswordComponent} from './password/password.component';
import {PasswordCreateComponent} from './password-create/password-create.component';
import {LoginComponent} from './login/login.component';

const ordersRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'password-create',
    component: PasswordCreateComponent
  }
];

export const ProfileRouting = RouterModule.forChild(ordersRoutes);
