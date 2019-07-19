import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Observable } from 'rxjs';

/* AUTH */
import { AuthService } from '../services/auth.service';

/* MODELS */
import { UserInterface } from '../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public name: string;

  constructor(
    private authService: AuthService
  ) { }

  public user: UserInterface = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    photoURL: '',
    altura: -1,
    edad: -1
  };

  staticNavBar() {
    $('nav').removeClass('fixed-top');
    $('footer').addClass('fixed-bottom');
  }

  ngOnInit() {
    this.staticNavBar();
    this.authService.isAuth().subscribe( (user) => {
      if (user) {
        this.user.firstName = user.displayName;
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
        this.user.displayName = user.displayName;
      }
    });
  }

}
