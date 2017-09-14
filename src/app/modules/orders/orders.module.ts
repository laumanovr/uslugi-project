import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersRouting} from './orders.routes';
import {OrdersComponent} from './orders.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import { DescriptionComponent } from './description/description.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRouting,
    NavBarModule
  ],
  declarations: [
    OrdersComponent,
    DescriptionComponent,
    ReviewComponent,
  ]
})
export class OrdersModule { }
