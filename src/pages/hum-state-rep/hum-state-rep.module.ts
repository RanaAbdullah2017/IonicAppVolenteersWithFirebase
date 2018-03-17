import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HumStateRepPage } from './hum-state-rep';

@NgModule({
  declarations: [
    HumStateRepPage,
  ],
  imports: [
    IonicPageModule.forChild(HumStateRepPage),
  ],
})
export class HumStateRepPageModule {}
