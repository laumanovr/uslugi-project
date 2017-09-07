import {RouterModule, Routes} from '@angular/router';
import {ContractorListComponent} from './contractor-list/contractor-list.component';
import {ContactsComponent} from './contacts/contacts.component';
import {CodeComponent} from './code/code.component';
import {ChooseTypeComponent} from './choose-type/choose-type.component';
import {MasterComponent} from './master/master.component';
import {ContractorComponent} from './contractor-info/contractor.component';

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
  },
  {
    path: 'choose',
    component: ChooseTypeComponent
  },
  {
    path: 'contractor-info',
    component: ContractorComponent
  },
  {
    path: 'master-call',
    component: MasterComponent
  }
];

export const MainRouting = RouterModule.forChild(ordersRoutes);
