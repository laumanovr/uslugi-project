import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './modules/main/main.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
];

export const AppRouting = RouterModule.forRoot(appRoutes);
