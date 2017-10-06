import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRouting} from './orders.routes';
import {OrdersComponent} from './orders.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {FormsModule} from '@angular/forms';
import {SwipeModule} from '../../shared/swipe/swipe.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRouting,
    NavBarModule,
    FormsModule,
    SwipeModule
  ],
  declarations: [
    OrdersComponent,
  ]
})
export class OrdersModule { }
