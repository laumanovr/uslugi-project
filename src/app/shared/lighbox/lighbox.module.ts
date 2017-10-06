import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LighboxComponent} from './lighbox.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LighboxComponent],
  exports: [LighboxComponent]
})
export class LighboxModule {
}
