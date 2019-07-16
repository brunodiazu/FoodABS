import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService : AuthService,
    public router : Router
  ) { }

  ngOnInit() {

    $('.header').removeClass("header").addClass("header-pro");
  }

  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then( (res) => {
      this.router.navigate(['user/profile'])

    }).catch( (err) => {
      console.log(err);
    });
  }
}
