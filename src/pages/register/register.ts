import { AngularFireDatabase } from 'angularfire2/database';
import { UpdateProfilePage } from './../update-profile/update-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { RecaptchaVerifier, ConfirmationResult } from '@firebase/auth-types';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  disableSubmit: boolean = true;
  confirmStep: boolean = false;
  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: ConfirmationResult;
  phoneNumber: HTMLInputElement;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private afDB: AngularFireDatabase,private storage: Storage) {
  }

  ionViewDidLoad() {

//check if user loggedin or not //
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.presentToast(user);
        unsubscribe();
      } else {
        this.navCtrl.setRoot(HomePage);
        unsubscribe();
      }
    });
//end of checking if user loggedin or not //


    console.log('ionViewDidLoad RegisterPage');


    this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha', {
      "size": "invisible",
      'callback': (response) => {

      }
    });
  }

  public phoneNumberChanged(phoneNumber: HTMLInputElement) {

    this.phoneNumber = phoneNumber;
    let number: string = phoneNumber.value;

    if (number.length > 10) {
      this.presentToast("يجب ان لا يزيد رقم الهاتف عن 11 رقم");
      this.disableSubmit = true;
    }

    if (number.length == 10) {
      this.disableSubmit = false;
    }
  }

  confirmPhoneNumber(phoneNumber) {
    phoneNumber = "+964" + phoneNumber;
    let loader = this.loadingCtrl.create({
      content: "يرجى الانتظار...",
      duration: 3000
    });

    loader.present();
    this.afAuth.auth.signInWithPhoneNumber(phoneNumber, this.phoneRecaptchaVerifier)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
        this.confirmStep = true;




      });


  }

  confirmCode(code) {

    let loader = this.loadingCtrl.create({
      content: "يرجى الانتظار..."
    });

    loader.present();


    this.confirmationResult.confirm(code)
      .then(result => {
        this.storage.set('loggedin','1');
        this.presentToast("تم تأكيد رقم الهاتف بنجاح");
        this.afDB
          .object('/users/' + this.afAuth.auth.currentUser.uid).update({
            phoneNumber: "+964" + this.phoneNumber.value,
            confirmed: true,
            registerDate: firebase.database.ServerValue.TIMESTAMP

          });
        loader.dismiss();
        this.navCtrl.setRoot(UpdateProfilePage);
        
      }).catch(error => {
        this.presentToast("الكود الذي ادخلته غير صحيح");
      })
  }

  resendCode() {
    this.confirmPhoneNumber(this.phoneNumber.value);
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}
