import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRouting} from './profile.routes';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import { PasswordComponent } from './password/password.component';
import { PasswordCreateComponent } from './password-create/password-create.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    NavBarModule
  ],
  declarations: [
    ProfileComponent,
    PasswordComponent,
    PasswordCreateComponent,
    LoginComponent
  ]
})
export class ProfileModule { }
