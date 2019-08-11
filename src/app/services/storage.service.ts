import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private afStorage: AngularFireStorage
  ) { }

  uploadFood(file: File) {
    const id = Math.random().toString(36).substring(2);
    const filex = file;
    const filePath = `uploads/food/food_${id}.jpg`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, filex);

    return filePath;
  }
}
