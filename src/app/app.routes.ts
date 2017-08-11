import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ChooseTypeComponent} from './choose-type/choose-type.component';
import {MasterComponent} from './master/master.component';
import {ContactsComponent} from './master/contacts/contacts.component';
import {CodeComponent} from './master/code/code.component';
import {ContractorComponent} from './contractor/contractor.component';
import {ContractorListComponent} from './contractor/contractor-list/contractor-list.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'choose', component: ChooseTypeComponent},
  {
    path: 'contractor',
    component: ContractorComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ContractorListComponent
      }
    ]
  },
  {
    path: 'master',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'code',
        component: CodeComponent
      },
    ]
  },
];

export const AppRouting = RouterModule.forRoot(appRoutes);
