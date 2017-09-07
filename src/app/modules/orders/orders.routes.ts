import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {DescriptionComponent} from './description/description.component';

const ordersRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'description',
    component: DescriptionComponent
  }
];

export const OrdersRouting = RouterModule.forChild(ordersRoutes);
