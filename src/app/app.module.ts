import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routes';
import {HomeComponent} from './components/home/home.component';
import {ChooseTypeComponent} from './components/choose-type/choose-type.component';
import {ContactsComponent} from './components/quick-registration/contacts/contacts.component';
import {CodeComponent} from './components/quick-registration/code/code.component';
import {ContractorComponent} from './components/contractor-info/contractor.component';
import {ContractorListComponent} from './components/contractor-list/contractor-list.component';
import {NavBarComponent} from './shared/nav-bar/nav-bar.component';
import {ProfileComponent} from './components/profile/profile.component';
import {QuickRegistrationComponent} from './components/quick-registration/quick-registration.component';
import {MasterComponent} from './components/master/master.component';
import {OrdersModule} from './modules/orders/orders.module';
import {NavBarModule} from './shared/nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChooseTypeComponent,
    ContactsComponent,
    CodeComponent,
    ContractorComponent,
    ContractorListComponent,
    ProfileComponent,
    QuickRegistrationComponent,
    MasterComponent,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    OrdersModule,
    NavBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
