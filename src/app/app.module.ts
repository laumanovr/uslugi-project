import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import { HomeComponent } from './home/home.component';
import { ChooseTypeComponent } from './choose-type/choose-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChooseTypeComponent
  ],
  imports: [
    AppRouting,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
