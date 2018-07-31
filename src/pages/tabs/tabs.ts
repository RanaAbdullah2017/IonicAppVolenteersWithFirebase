import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs } from 'ionic-angular';

import { PoorPage } from '../poor/poor';
import { DisasterPage } from '../disaster/disaster';
import { SickPage } from '../sick/sick';
import { EmigratePage } from '../emigrate/emigrate';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  poorRoot=PoorPage;
  homeRoot=HomePage;
  disasterRoot=DisasterPage;
  sickRoot=SickPage;
  emigrateRoot=EmigratePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.myIndex = navParams.data.tabIndex || 0;
  }
  ngOnInit(){
    // this.getposts();
 
   }
  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabRef.select(openTab);
    }
  }

 

}
 