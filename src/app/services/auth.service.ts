import { Injectable } from '@angular/core';

/* RJ */
import { map } from 'rxjs/operators';

/* FireBase */
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { AngularFireDatabase } from '@angular/fire/database';

/* MODELS */
import { UserInterface } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {}

  public user: UserInterface = {
    id : '',
    firstName : '',
    lastName : '',
    email : '',
    photoURL : '',
    displayName : '',
    altura : -1,
    edad : -1
  };

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  registerUser(firstName: string, lastName: string, email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData);
        this.createUser(userData, firstName, lastName);
        this.addToDataBase(userData);
      },
        err => reject(err));
    });
  }

  private createUser(userData: firebase.auth.UserCredential, firstName: string, lastName: string) {
    this.user.id = userData.user.uid;
    this.user.email = userData.user.email;
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.displayName = firstName + ' ' + lastName;
    this.user.photoURL = userData.user.photoURL;
  }

  private createUserGoogle(userData: firebase.auth.UserCredential) {
    this.user.id = userData.user.uid;
    this.user.email = userData.user.email;
    this.user.displayName = userData.user.displayName;
    console.log(userData.user.displayName);
  }

  addToDataBase(userData: firebase.auth.UserCredential) {
    this.afDatabase.database.ref('users/' + userData.user.uid).set({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      displayName : this.user.displayName,
      photoURL: this.user.photoURL
    });
  }

  loginGoogleUser() {
    return new Promise ( (resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(userData => {
        this.createUserGoogle(userData);
        this.addToDataBase(userData);
        resolve(userData);
      },
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
