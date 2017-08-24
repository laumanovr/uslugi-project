import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersRouting} from './orders.routes';
import {OrdersComponent} from './orders.component';
import {ListComponent} from './list/list.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRouting,
    NavBarModule
  ],
  declarations: [
    OrdersComponent,
    ListComponent,
  ]
})
export class OrdersModule { }
