import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicesUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesUserProvider {

  _user: any;
  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello ServicesUserProvider Provider');
  }

  getUser(phoneNumber){
    return this.afDB.object('/users/' + phoneNumber)
               .valueChanges()
                .subscribe(user => {
                  this.user = user;
                  console.log(user);
                });
  }



  get user() { return this._user; }
  set user(user) { this._user = user; }

}
