import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import { HomeComponent } from './home/home.component';
import { ChooseTypeComponent } from './choose-type/choose-type.component';
import { MasterComponent } from './master/master.component';
import { ContactsComponent } from './master/contacts/contacts.component';
import { CodeComponent } from './master/code/code.component';
import { ContractorComponent } from './contractor/contractor.component';
import { ContractorListComponent } from './contractor/contractor-list/contractor-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChooseTypeComponent,
    MasterComponent,
    ContactsComponent,
    CodeComponent,
    ContractorComponent,
    ContractorListComponent,
    NavBarComponent
  ],
  imports: [
    AppRouting,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
