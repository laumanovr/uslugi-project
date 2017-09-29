import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRouting} from './orders.routes';
import {OrdersComponent} from './orders.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrdersRouting,
    NavBarModule,
    FormsModule
  ],
  declarations: [
    OrdersComponent,
  ]
})
export class OrdersModule { }
