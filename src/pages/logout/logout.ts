import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InitialPage } from '../initial/initial';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    public userService: UserProvider) {
  }

  ionViewDidLoad() {
    this.storage.clear();
    this.userService.user = null;
    firebase.auth().signOut();
    this.navCtrl.setRoot(InitialPage);
  }

}
