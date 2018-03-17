import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../app/AppService.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public XService:AppService,
    public http:Http ,
    private httpClient:HttpClient,
    private afDB: AngularFireDatabase,
    private afStorage: AngularFireStorage) {
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
getProfile(){
    console.log(this.name);
    let url:any;
    var javascriptCallout=this.httpClient.get('https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles')
    .subscribe(
        (data:any[]) => {
            console.log(data);
        }
    );
}
///save images
image1Change(event){
    console.log(event.target.files[0]);
    this.image1 = event.target.files[0];
}
///save data in firebase
butsubmit(type, name, location,  details){
    console.log("Loading...")

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
    }, error => console.log(error));
})
}

}
