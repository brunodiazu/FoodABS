import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  public displayName: string;

  constructor(
    public afAuth: AuthService
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

}
