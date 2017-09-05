import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {MainRouting} from './main.routes';
import {ContractorListComponent} from './contractor-list/contractor-list.component';
import {ContactsComponent} from './contacts/contacts.component';
import {FormsModule} from '@angular/forms';
import {CodeComponent} from './code/code.component';

@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    FormsModule,
    NavBarModule
  ],
  declarations: [
    MainComponent,
    ContractorListComponent,
    ContactsComponent,
    CodeComponent
  ]
})
export class MainModule { }
