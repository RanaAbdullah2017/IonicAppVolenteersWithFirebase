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
    this.needers = this.afDb.list('volenteers', ref => ref.orderByChild('date')).valueChanges();
  }
}

