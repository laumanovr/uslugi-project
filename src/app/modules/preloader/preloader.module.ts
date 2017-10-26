import {NgModule} from '@angular/core';
import {PreloaderComponent} from '../preloader/preloader.component';


@NgModule({
  declarations: [
    PreloaderComponent
  ],

  exports: [
    PreloaderComponent
  ]
})

export class PreloaderModule {
}
