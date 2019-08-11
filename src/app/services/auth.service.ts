import { Injectable } from '@angular/core';

/* RJ */
import { map } from 'rxjs/operators';

/* FireBase */
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { DatabaseService } from './database.service';

/* MODELS */
import { UserInterface } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: DatabaseService
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

  logOut() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  registerUser(firstName: string, lastName: string, email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        this.createUser(
          userData.user.uid,
          userData.user.email,
          firstName,
          lastName,
          userData.user.displayName,
          userData.user.photoURL
        );
        this.addToDataBase(userData);
        resolve(userData);
      },
        err => reject(err));
    });
  }

  loginGoogleUser() {
    return new Promise ( (resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(userData => {
        this.createUser(
          userData.user.uid,
          userData.user.email,
          '',
          '',
          userData.user.displayName,
          userData.user.photoURL
        );
        this.addToDataBase(userData);
        resolve(userData);
      },
        err => reject(err));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
            err => reject(err));
    });
  }

  private createUser(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    displayName: string,
    photoURL: string) {
    this.user.id = id;
    this.user.email = email;
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.displayName = displayName;
    this.user.photoURL = photoURL;

    if (this.user.displayName === '') {
      this.user.displayName = firstName + lastName;
    }
  }

  private addToDataBase(userData: firebase.auth.UserCredential) {
    const user = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      displayName : this.user.displayName,
      photoURL: this.user.photoURL
    };
    this.afDatabase.uploadUser(userData.user.uid, user);
  }
}
