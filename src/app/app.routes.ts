import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ChooseTypeComponent} from './choose-type/choose-type.component';
import {MasterComponent} from './master/master.component';
import {ContactsComponent} from './master/contacts/contacts.component';
import {CodeComponent} from './master/code/code.component';
import {ContractorComponent} from './contractor-info/contractor.component';
import {ContractorListComponent} from './contractors/contractor-list.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'choose', component: ChooseTypeComponent},
  {path: 'contractors', component: ContractorListComponent},
  {path: 'contractor-info', component: ContractorComponent},

  // Old routes
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
