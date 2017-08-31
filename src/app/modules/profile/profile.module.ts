import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRouting} from './profile.routes';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    NavBarModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
