import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SwipeComponent} from './swipe.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SwipeComponent
  ],
  exports: [
    SwipeComponent
  ]
})
export class SwipeModule { }
