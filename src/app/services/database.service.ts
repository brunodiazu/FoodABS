import { Injectable } from '@angular/core';

/* RJ */
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public afAuth: AuthService,
    public afDataBase: AngularFireDatabase
  ) { }


}
