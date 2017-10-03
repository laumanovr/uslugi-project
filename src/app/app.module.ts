import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routes';
import {OrdersModule} from './modules/orders/orders.module';
import {NavBarModule} from './shared/nav-bar/nav-bar.module';
import {HttpModule} from '@angular/http';
import {CustomRequest} from './services/request.service';
import {ProfileModule} from './modules/profile/profile.module';
import {CommonService} from './services/common.service';
import {FormsModule} from '@angular/forms';
import {MainModule} from './modules/main/main.module';
import {MasterService} from './services/master.service';
import { LightboxDirective } from './directives/lightbox.directive';

@NgModule({
  declarations: [
    AppComponent,
    LightboxDirective,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    OrdersModule,
    NavBarModule,
    ProfileModule
  ],
  providers: [
    CustomRequest,
    CommonService,
    MasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
