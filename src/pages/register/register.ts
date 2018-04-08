import { UserProvider } from './../../providers/user/user';
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
  pageName: string;
  userExists: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private afDB: AngularFireDatabase,
    private storage: Storage,
    public userService: UserProvider) {
  }

  ionViewDidLoad() {
this.afAuth.auth.signOut();
this.pageName = this.navParams.get('pageName');
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

  sendConfirmationCode(phoneNumber) {
    phoneNumber = "+964" + phoneNumber;
    let loader = this.loadingCtrl.create({
      content: "يرجى الانتظار...",
      duration: 2000
    });      
    

    loader.present().then((_ => this.confirmStep = true));
    this.userService.checkUserExists(phoneNumber).subscribe(user => {
      if(user == null)
        this.userExists = false;
      else {
        this.userExists = true;
       
      };
    })
    this.afAuth.auth.signInWithPhoneNumber(phoneNumber, this.phoneRecaptchaVerifier)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
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
        let phoneNumber = "+964" + this.phoneNumber.value
        if(this.userExists == false){
          
          let user = {
            phoneNumber: phoneNumber,
            confirmed: true,
            registerDate: firebase.database.ServerValue.TIMESTAMP,
            uid: this.afAuth.auth.currentUser.uid,
            isExists: true
          };

          this.userService.user = user;
          this.afDB
          .object('/users/' + phoneNumber).update(user).then(_ => {
            this.userService.getUser("+964" + this.phoneNumber.value);
            this.navCtrl.setRoot(UpdateProfilePage);
            loader.dismiss();

          });
        }else {
          this.userService.getUser("+964" + this.phoneNumber.value);
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        }
       
        
        
       
        
      }).catch(error => {
        this.presentToast("الكود الذي ادخلته غير صحيح");
      })
  }

  resendCode() {
    this.sendConfirmationCode(this.phoneNumber.value);
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}
