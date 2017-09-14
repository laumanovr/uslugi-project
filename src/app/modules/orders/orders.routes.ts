import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {DescriptionComponent} from './description/description.component';
import {ReviewComponent} from './review/review.component';

const ordersRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'description',
    component: DescriptionComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  }
];

export const OrdersRouting = RouterModule.forChild(ordersRoutes);
