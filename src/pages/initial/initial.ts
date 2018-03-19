import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';

// import { HomePage } from '../home/home';
import { HomePage } from '../home/home';
import { HumStateRepPage } from '../hum-state-rep/hum-state-rep';
import { Storage } from '@ionic/storage';
// import {Routes, RouterModule, Router} from "@angular/router";

/**
 * Generated class for the InitialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
// @ViewChild(Nav) nav: Nav;
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {
  check:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
  }

 
  start(){
    this.navCtrl.setRoot(HomePage);
    this.storage.set('firsttime','1');
    // this.n.push('HumStateRepPage');
  }
}
