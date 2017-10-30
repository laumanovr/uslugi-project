import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import {ProfileRouting} from './profile.routes';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {PasswordComponent} from './password/password.component';
import {PasswordCreateComponent} from './password-create/password-create.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration/registration.component';
import {PreloaderModule} from "../preloader/preloader.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    NavBarModule,
    FormsModule,
    TextMaskModule,
    PreloaderModule
  ],
  declarations: [
    ProfileComponent,
    PasswordComponent,
    PasswordCreateComponent,
    LoginComponent,
    RegistrationComponent,
  ],
})
export class ProfileModule { }
