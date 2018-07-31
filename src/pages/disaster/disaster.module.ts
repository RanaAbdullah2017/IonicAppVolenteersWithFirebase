import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisasterPage } from './disaster';

@NgModule({
  declarations: [
    DisasterPage,
  ],
  imports: [
    IonicPageModule.forChild(DisasterPage),
  ],
})
export class DisasterPageModule {}
