import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OperatorComponent} from './operator.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {RouterModule, Routes} from '@angular/router';

const operatorRoutes: Routes = [
  {
    path: 'operator',
    component: OperatorComponent
  }
];
const OperatorRouting = RouterModule.forChild(operatorRoutes);


@NgModule({
  imports: [
    CommonModule,
    OperatorRouting,
    NavBarModule
  ],
  declarations: [OperatorComponent],
  exports: [OperatorComponent]
})
export class OperatorModule { }
