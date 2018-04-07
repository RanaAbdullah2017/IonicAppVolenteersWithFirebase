import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  public user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public userService: UserProvider) {

  }

  ionViewDidLoad() {
   
  }


  updateProfile(name: HTMLInputElement, address: HTMLInputElement, job: HTMLInputElement){


      if(name.value.length <= 3){
        this.presentToast("يرجى ادخال الاسم بشكل صحيح");
        return;
      }

      if(address.value.length <= 3){
        this.presentToast("يجب ادخال العنوان بشكل صحيح");
        return;
      }
      if(job.value.length <= 3){
        this.presentToast("يجب ادخال الوصف الوظيفي بشكل صحيح");
        return;
      }
   
      if(this.userService.user == null)
        return;
        
        let loader = this.loadingCtrl.create({
        content: "يرجى الانتظار"
      });
      loader.present();

      
      this.afDB.object('users/' + this.userService.user.phoneNumber).update({
        fullName: name.value,
        address: address.value,
        job: job.value
      }).then(_ => {
        loader.dismiss();
        this.presentToast("تم التحديث البيانات بنجاح")
      }).catch(_ => {
        loader.dismiss();
        this.presentToast("حدث خطأ اثناء اضافة البيانات");
      })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
