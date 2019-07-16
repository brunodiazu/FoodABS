import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  onSubmitLogin() {
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res) => {
      this.router.navigate(['user/profile']);
    }).catch( (err) => {
      console.log(err);
      this.router.navigate(['user/login']);
    });
  }

  ngOnInit() {
  }
}
