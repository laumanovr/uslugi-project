import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import { ContactsComponent } from './components/quick-registration/contacts/contacts.component';
import { CodeComponent } from './components/quick-registration/code/code.component';
import { ContractorComponent } from './components/contractor-info/contractor.component';
import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuickRegistrationComponent } from './components/quick-registration/quick-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChooseTypeComponent,
    ContactsComponent,
    CodeComponent,
    ContractorComponent,
    ContractorListComponent,
    NavBarComponent,
    ProfileComponent,
    QuickRegistrationComponent
  ],
  imports: [
    AppRouting,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
