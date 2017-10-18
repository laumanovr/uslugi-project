import {RouterModule, Routes} from '@angular/router';
import {PasswordComponent} from './password/password.component';
import {PasswordCreateComponent} from './password-create/password-create.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from '../../guards/auth.guard';

const ordersRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
