import { Component ,ViewChild, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ReflectiveInjector } from '@angular/core/src/di/reflective_injector';
import { AppService } from '../../app/AppService.service';
import { AngularFireDatabase } from 'angularfire2/database';


// @IonicPage()
@Component({
  selector: 'page-poor',
  templateUrl: 'poor.html',
})

export class PoorPage {
  public images:any=[];
  public needers: any;
  

  
  // pagesTab: PageInterface[]=[
  //   {title: 'tab 1', pageName: 'TabsPage1', tabComponent: 'Tab1Page',  index:0, icon:'home'},
  //   {title: 'tab 2', pageName: 'TabsPage2', tabComponent: 'Tab2Page',  index:1, icon:'home'},
  //   {title: 'tab 3', pageName: 'TabsPage3', tabComponent: 'Tab3Page',  index:2, icon:'home'},
  //   {title: 'tab 4', pageName: 'TabsPage4', tabComponent: 'Tab4Page',  index:3, icon:'home'},

  //  ]
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
