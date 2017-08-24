import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ChooseTypeComponent} from './components/choose-type/choose-type.component';
import {ContactsComponent} from './components/quick-registration/contacts/contacts.component';
import {CodeComponent} from './components/quick-registration/code/code.component';
import {ContractorComponent} from './components/contractor-info/contractor.component';
import {ContractorListComponent} from './components/contractor-list/contractor-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {QuickRegistrationComponent} from './components/quick-registration/quick-registration.component';
import {MasterComponent} from './components/master/master.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'choose', component: ChooseTypeComponent},
  {path: 'contractor-list', component: ContractorListComponent},
  {path: 'contractor-info', component: ContractorComponent},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'quick-registration',
    component: QuickRegistrationComponent,
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
      }
    ]
  },
  {path: 'master', component: MasterComponent},
];

export const AppRouting = RouterModule.forRoot(appRoutes);
