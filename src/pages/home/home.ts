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
  
x:number=5;
y:number=5;

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
getposts(){ this.needers = this.afDb.list('volenteers', ref => ref.orderByKey().limitToLast(this.x)).valueChanges();

}



 
  doRefresh(refresher) {this.getposts()
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
//Temporary way to load until find solution for infinte scorll 
    setTimeout(() => {
     this.x=this.x+this.y;
    this. getposts()

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}



