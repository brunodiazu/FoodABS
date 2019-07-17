import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  constructor(
    public afAuth: AuthService
  ) {
    this.isLogged = false;
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.afAuth.isAuth().subscribe( auth => {
      if ( auth ) {
        console.log('Usuario logeado');
        this.isLogged = true;
      }
      else {
        console.log('Usuario no logeado');
        this.isLogged = false;
      }
    })
  }

}
