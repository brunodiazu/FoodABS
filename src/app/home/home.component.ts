import { Component, OnInit } from '@angular/core';

import { DropzoneComponent ,
         DropzoneDirective,
         DropzoneConfigInterface
        } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public foodDetection: string = null;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    createImageThumbnails: false
  };

  constructor() { }

  ngOnInit() {
  }

  onUploadError(args: any) {

  }

  onUploadSuccess(args: any) {
    /* Si el archivo se subió correctamente, el servidor envia un JSON*/
    /* El JSON del servidor, se encuentra como segundo argumento de args (partiendo de cero) */
    console.log(args[1]);
    if (args[1] != null) {
      if (args[1].food_predict != null) {
        console.log(args[1].food_predict);
        this.foodDetection = this.capitalizeOnlyFirst(args[1].food_predict);
      }
    }
  }

  /* Funciones de preprocesamiento del JSON */
  capitalizeOnlyFirst(myString: string) {
    return (myString.charAt(0).toUpperCase() + myString.slice(1).toLowerCase()).replace(/_/g, ' ');
  }
}
