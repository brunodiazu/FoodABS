import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

/* DROPZONE */
import { DropzoneComponent ,
  DropzoneDirective,
  DropzoneConfigInterface
 } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  public displayName: string;

  public foodDetection: string;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    createImageThumbnails: false
  };

  constructor(
    public afAuth: AuthService,
    public afDatabase: DatabaseService
  ) {
    this.isLogged = false;
    this.displayName = '';
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  onLogout() {
    this.afAuth.logOut();
  }

  onLogin() {

  }

  onFoodApi() {

  }

  getCurrentUser() {
    this.afAuth.isAuth().subscribe( auth => {
      if ( auth ) {
        console.log('Usuario logeado');
        this.isLogged = true;
        this.displayName = this.afAuth.user.displayName;
      } else {
        console.log('Usuario no logeado');
        this.isLogged = false;
      }
    })
  }

  onUploadError(args: any) {

  }

  /* Boton de confirmar presionado por el usuario */
  /* Enviar foto y respuesta a la base de datos */
  onConfirm() {

  }

  onUploadSuccess(args: any) {
    /* Si el archivo se subió correctamente, el servidor envia un JSON*/
    /* El JSON del servidor, se encuentra como segundo argumento de args (partiendo de cero) */
    console.log(args[1]);
    if (args[1] != null) {
      if (args[1].food_predict != null) {
        console.log(args[1].food_predict);
        this.foodDetection = this.capitalizeOnlyFirst(args[1].food_predict);
        $('#confirmar').removeAttr("disabled");
      }
    }
  }

  /* Funciones de preprocesamiento del JSON */
  capitalizeOnlyFirst(myString: string) {
    return (myString.charAt(0).toUpperCase() + myString.slice(1).toLowerCase()).replace(/_/g, ' ');
  }

}
