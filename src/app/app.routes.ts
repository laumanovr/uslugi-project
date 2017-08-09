import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ChooseTypeComponent} from './choose-type/choose-type.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'choose', component: ChooseTypeComponent},
];

export const AppRouting = RouterModule.forRoot(appRoutes);
