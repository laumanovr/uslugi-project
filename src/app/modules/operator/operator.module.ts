import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperatorComponent} from './operator.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {FormsModule} from "@angular/forms";

const operatorRoutes: Routes = [
  {
    path: 'operator',
    component: OperatorComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];
const OperatorRouting = RouterModule.forChild(operatorRoutes);


@NgModule({
  imports: [
    CommonModule,
    OperatorRouting,
    NavBarModule,
    FormsModule
  ],
  declarations: [OperatorComponent, ChatComponent],
  exports: [OperatorComponent]
})
export class OperatorModule {
}
