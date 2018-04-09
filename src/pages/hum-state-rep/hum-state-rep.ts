import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, AlertController } from 'ionic-angular';
import { AppService } from '../../app/AppService.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the HumStateRepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hum-state-rep',
  templateUrl: 'hum-state-rep.html',
})
export class HumStateRepPage {
  resp:any;
  name:string='';
  image: any;
  loggedin:any=false;


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,private toastCtrl: ToastController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private user: UserProvider,
    public alertCtrl: AlertController) {

  }
  ionViewDidLoad() {

    //check if user loggedin or not //
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            this.navCtrl.setRoot(RegisterPage);
            unsubscribe();
          } else {
         //   this.navCtrl.setRoot(HomePage);
        // console.log("User Loggedin")
            unsubscribe();
          }
        });
    //end of checking if user loggedin or not //
      }

imageInputChange(event){
   

    let image = event.target.files[0];

    if(image == null)
      return;

    if((image.size/1024) > 250){
      this.resizeImage(image, 750, 750).then(image => {
        this.presentToast('لقد اخترت صورة ذات حجم اكبر من المسموح به سيتم تغيير حجمها');
        this.image = image;
      });
    } else this.image = event.target.files[0];
}

///save data in firebase
submit(type, fullname, city, address, details){


    if(type.value.length <= 0){
      this.presentToast('يرجى اختيار نوع الحالة');
      return;
    }
      

    if(fullname.value.length <= 10){
      this.presentToast('يجب ان لا يقل الاسم عن 10 حروف');
      return;
    }
    
    if(city.value.length <= 0){
      this.presentToast('يرجى اختيار المحافظة');
      return;
    }

    
    if(address.value.length <= 10){
      this.presentToast('يجب ان لا يقل النقطة الدالة عن 10 حروف');
      return;
    }

    if(details.value.length <= 25){
      this.presentToast('يجب ان لا يقل شرح الحالة عن 25 حرف');
      return;
    }


    if(this.image == null){
      this.presentToast('يجب اختيار صورة');
      return;
    }

    let loadingsppiner = this.loadingCtrl.create({
        content: 'يرجى الانتظار ...'
      });

    loadingsppiner.present();
    let path = 'images/' + this.afAuth.auth.currentUser.uid + '/' + Date.now();
    let uploadTask = this.afStorage.upload(path, this.image);


    uploadTask.then(file => {

      this.afDB.list('notifications_approved').push({
        time: firebase.database.ServerValue.TIMESTAMP,
        city: city.value,
        type: type.value,
        fullname: fullname.value,
        details: details.value,
        address: address.value,
        image: file.downloadURL,
        image_path: path,
        userUID: this.afAuth.auth.currentUser.uid

      }).then(_ => {

        let alert = this.alertCtrl.create({
          title: 'تم الارسال بنجاح',
          subTitle: 'شكراً لك للابلاغ ... سيتم نشره بعد التحقق',
          buttons: ['موافق']
        });
        alert.present();
        city.value = null;
        type.value = null;
        fullname.value = null;
        details.value = null;
        address.value = null;
        this.image = null;
        loadingsppiner.dismiss();

        this.user.getUserFromStorage().then(user => {
          this.afDB.database
            .ref('users/' + user.phoneNumber + '/no_of_notifications')
            .transaction(noOfNotifications => {
              return noOfNotifications + 1;
            })
        })

      }, error => {
        this.presentToast('حدث خطأ ما يرجى اعادة الارسال لاحقاً');
        loadingsppiner.dismiss();
      });



    }).catch(err => {
      loadingsppiner.dismiss();
      this.presentToast('حدث خطأ ما يرجى اعادة الارسال لاحقاً');
    })

}
errortoast(){
    let toast = this.toastCtrl.create({
        message: 'حدث خطأ حاول مجدداً',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {

      });

      toast.present();
}

presentToast(msg){
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}
 resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
  return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
          let width = image.width;
          let height = image.height;
          
          if (width <= maxWidth && height <= maxHeight) {
              resolve(file);
          }

          let newWidth;
          let newHeight;

          if (width > height) {
              newHeight = height * (maxWidth / width);
              newWidth = maxWidth;
          } else {
              newWidth = width * (maxHeight / height);
              newHeight = maxHeight;
          }

          let canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;

          let context = canvas.getContext('2d');

          context.drawImage(image, 0, 0, newWidth, newHeight);

          canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
  });
}


}
