import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {MainRouting} from './main.routes';
import {ContractorListComponent} from './contractor-list/contractor-list.component';
import {ContactsComponent} from './contacts/contacts.component';
import {FormsModule} from '@angular/forms';
import {CodeComponent} from './code/code.component';
import {ChooseTypeComponent} from './choose-type/choose-type.component';
import {MasterComponent} from './master/master.component';
import {MasterDescModule} from '../../shared/master-desc/master-desc.module';

@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    FormsModule,
    NavBarModule,
    MasterDescModule
  ],
  declarations: [
    MainComponent,
    ContractorListComponent,
    ContactsComponent,
    CodeComponent,
    ChooseTypeComponent,
    MasterComponent,
  ]
})
export class MainModule {
}
