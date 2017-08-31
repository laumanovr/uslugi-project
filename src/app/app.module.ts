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
import {QuickRegistrationComponent} from './components/quick-registration/quick-registration.component';
import {MasterComponent} from './components/master/master.component';
import {OrdersModule} from './modules/orders/orders.module';
import {NavBarModule} from './shared/nav-bar/nav-bar.module';
import {HttpModule} from '@angular/http';
import {RequestService} from './services/request.service';
import {ProfileModule} from './modules/profile/profile.module';
import {ProfileService} from './services/profile.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChooseTypeComponent,
    ContactsComponent,
    CodeComponent,
    ContractorComponent,
    ContractorListComponent,
    QuickRegistrationComponent,
    MasterComponent,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    HttpModule,
    OrdersModule,
    NavBarModule,
    ProfileModule
  ],
  providers: [
    RequestService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
