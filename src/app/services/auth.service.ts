import { Injectable } from '@angular/core';

/* RJ */
import { map } from "rxjs/operators";

/* FireBase */
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    public afAuth : AngularFireAuth
  ) {}

  getAuth(){

    return this.afAuth.authState.pipe(map (auth => { auth }));
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
            err => reject(err));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
            err => reject(err));
    });
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

}
