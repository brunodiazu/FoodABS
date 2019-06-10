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

  onUploadError(args: any){

  }

  onUploadSuccess(args: any){

  }
}
