import {RouterModule, Routes} from '@angular/router';
import {ContractorListComponent} from './contractor-list/contractor-list.component';
import {ContactsComponent} from './contacts/contacts.component';
import {CodeComponent} from './code/code.component';

const ordersRoutes: Routes = [
  {
    path: 'contractors',
    component: ContractorListComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'sms-code',
    component: CodeComponent
  }
];

export const MainRouting = RouterModule.forChild(ordersRoutes);
