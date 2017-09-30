import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterDescComponent} from './master-desc.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MasterDescComponent
  ],
  exports: [
    MasterDescComponent
  ]
})
export class MasterDescModule { }
