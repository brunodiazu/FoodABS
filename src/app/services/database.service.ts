import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  uploadUser(id: string, user: object) {
    this.afDatabase.database.ref('users/' + id).set(user);
  }

  uploadFood(id: string, filePath: string) {

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['users/' + id + '/foods'] = filePath;

    return this.afDatabase.database.ref().update(updates);
  }
}
