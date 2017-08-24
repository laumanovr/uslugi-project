import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {ListComponent} from './list/list.component';

const ordersRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  },
];

export const OrdersRouting = RouterModule.forChild(ordersRoutes);
