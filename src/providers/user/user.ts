import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  _user: any;
  constructor(
    private afDB: AngularFireDatabase,
    public storage: Storage) {
    
      this.getUserFromStorage().then(user => this.user = user);
  }

  getUser(phoneNumber){
    return this.afDB.object('/users/' + phoneNumber)
               .valueChanges()
                .subscribe(user => {
                  this.user = user;
                 this.storage.set('user', user);
                 
                });
  }


getUserFromStorage(){
  return this.storage.get('user');
}


  get user() { return this._user; }
  set user(user) { this._user = user; }

}
