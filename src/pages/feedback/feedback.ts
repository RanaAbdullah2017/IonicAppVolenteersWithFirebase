import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,ViewController} from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import{HomePage} from '../home/home'
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  newFeedback :AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams 
    , public viewCtrl: ViewController, public db:AngularFireDatabase,
    public alertCtrl: AlertController) {
      this.newFeedback = db.list('/Feedback');
  }

  ionViewDidLoad() {
      //check if user loggedin or not //
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.navCtrl.setRoot(RegisterPage);
          unsubscribe();
        } else {
       //   this.navCtrl.setRoot(HomePage);
       console.log("User Loggedin")
          unsubscribe();
        }
      });
  //end of checking if user loggedin or not //
  }
  sendfeedback(feedback_title,feedback_subject){

    let  d = new Date();
    let time = [d.getMonth()+1,
                d.getDate(),
                d.getFullYear()].join('/')+' '+
               [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
       this.newFeedback.push({
     feedback_title:feedback_title,
     feedback_subject:feedback_subject,
     decs:0- Date.now(),
     time:time
   }).then(newPerson =>{
    this. showAlert()
     },error => {
     console.log(error);
   }
 )
   }
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'شكرا لك',
      subTitle: 'شاكرين تواصلك معنا وسنأخذ برأيك بعين الاعتبار',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },
      ]
    });
    alert.present();
  }

}
