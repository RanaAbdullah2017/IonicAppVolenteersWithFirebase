import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AppService } from '../../app/AppService.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';
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
  image1: any;
loggedin:any=false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,private toastCtrl: ToastController,
    public navParams: NavParams,
    public XService:AppService,
    public http:Http ,
    private httpClient:HttpClient,
    private afDB: AngularFireDatabase,
    private afStorage: AngularFireStorage) {
   
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
////write info into json file
  callPostData(Fname,Loc,Dir,Det)
  {
      let p=this.XService.postNeeders(Fname,Loc,Dir,Det);
      p.then(data => {
        console.log("Received");
        this.resp=JSON.stringify(data.JSON().data);
        
      });
  }
  onNameKeyUp(event: any){
    this.name=event.target.value;
}
////read json file from https
//getProfile(){
  //  console.log(this.name);
   // let url:any;
   // var javascriptCallout=this.httpClient.get('https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles')
  //  .subscribe(
  //      (data:any[]) => {
   //         console.log(data);
  //      }
//    );
//}
///save images
image1Change(event){
    console.log(event.target.files[0]);
    this.image1 = event.target.files[0];
}
///save data in firebase
butsubmit(type, name, location,  details){
    let loadingsppiner = this.loadingCtrl.create({
        content: 'يرجى الانتظار ...'
      });
    
      loadingsppiner.present();

let loading = this.afStorage.upload(Date.now() + this.image1.name, this.image1);
loading.percentageChanges().subscribe(p => console.log(p));

loading.then(file => {  
   
   
    this.afDB.list('volenteers').push({
        
        
        sendDate: Date.now(),
        loca: location.value,
        type: type.value,
        name: name.value,
        det: details.value,
        image: file.downloadURL
        
    }).then(_ => {
        
        console.log('success')
        location.value = '';
        type.value = '';
        name.value = '';
        details.value = '';
        setTimeout(() => {
            loadingsppiner.dismiss();
            this.navCtrl.setRoot(HomePage); 
          }, 2000);
        
    }, error =>{  setTimeout(() => {
        loadingsppiner.dismiss();
        this.errortoast()
      }, 5000);
     });

   
     
}).catch(err=>{ setTimeout(() => {
    loadingsppiner.dismiss();
    this.errortoast()
  }, 5000);})

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

}
