import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';

const ordersRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  }
];

export const OrdersRouting = RouterModule.forChild(ordersRoutes);
