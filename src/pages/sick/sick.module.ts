import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SickPage } from './sick';

@NgModule({
  declarations: [
    SickPage,
  ],
  imports: [
    IonicPageModule.forChild(SickPage),
  ],
})
export class SickPageModule {}
