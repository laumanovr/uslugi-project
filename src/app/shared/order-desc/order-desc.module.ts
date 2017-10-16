import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDescComponent } from './order-desc.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderDescComponent],
  exports: [OrderDescComponent]
})
export class OrderDescModule { }
