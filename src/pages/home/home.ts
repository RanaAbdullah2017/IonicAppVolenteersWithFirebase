import { Component ,ViewChild, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ReflectiveInjector } from '@angular/core/src/di/reflective_injector';
import { AppService } from '../../app/AppService.service';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{
  public images:any=[];
  public needers: any;

  constructor(public navCtrl: NavController,
              public http:Http,
              public dataService:AppService,
              private afDb: AngularFireDatabase) {

  }
////read and view data from database
  ngOnInit(){
   this.getposts();

  }
  //Temporary way to load until find solution for infinte scorll
getposts(){
  this.needers = this.afDb.list('notifications_approved', ref => {
    return ref.orderByChild('time').limitToLast(50);
  }).valueChanges().map(values => {
    return values.reverse().map((value: Notification) => {

        let date = new Date(value.time);
        value.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      
      
     
      return value;
    })
  });

  interface Notification{
    address: string;
    city: string;
    date: string;
    details: string;
    fullname: string;
    image: string;
    image_path: string;
    time: number;
    type: string;
    userUID: string;
  }
}




  doRefresh(refresher) {this.getposts()
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }



}



