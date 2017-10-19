import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routes';
import {OrdersModule} from './modules/orders/orders.module';
import {HttpModule} from '@angular/http';
import {ProfileModule} from './modules/profile/profile.module';
import {CommonService} from './services/common.service';
import {FormsModule} from '@angular/forms';
import {MainModule} from './modules/main/main.module';
import {OperatorModule} from './modules/operator/operator.module';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    OrdersModule,
    ProfileModule,
    OperatorModule,
    TextMaskModule
  ],
  providers: [
    CommonService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
