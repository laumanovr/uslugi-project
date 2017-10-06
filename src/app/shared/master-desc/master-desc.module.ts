import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterDescComponent} from './master-desc.component';
import {SwipeModule} from '../swipe/swipe.module';

@NgModule({
  imports: [
    CommonModule,
    SwipeModule
  ],
  declarations: [
    MasterDescComponent
  ],
  exports: [
    MasterDescComponent
  ]
})
export class MasterDescModule { }
