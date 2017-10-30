import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {OperatorComponent} from './operator.component';
import {NavBarModule} from '../../shared/nav-bar/nav-bar.module';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {GeolocationComponent} from './geolocation/geolocation.component';
import {FormsModule} from "@angular/forms";
import {PreloaderModule} from "../preloader/preloader.module";

const operatorRoutes: Routes = [
  {
    path: 'operator',
    component: OperatorComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'geolocation',
    component: GeolocationComponent
  }
];
const OperatorRouting = RouterModule.forChild(operatorRoutes);


@NgModule({
  imports: [
    CommonModule,
    OperatorRouting,
    NavBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAI9h51OE6MDUJPtjMLIvMxmEkGcSkHQVs&language=ru'
    }),
    NavBarModule,
    FormsModule,
    PreloaderModule
  ],
  declarations: [OperatorComponent, ChatComponent, GeolocationComponent],
  exports: [OperatorComponent]
})
export class OperatorModule {
}
