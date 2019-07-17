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

  user: UserInterface = {
    firstName: '',
    lastName: '',
    email: '',
    photoURL: ''
  };

  ngOnInit() {
    this.sideBar();
    this.name = "YOUR_NAME";

    this.authService.isAuth().subscribe( (user) => {
      if (user) {
        this.user.firstName = user.displayName;
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
      }
    });
  }



  sideBar() {
    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });
  }

}
