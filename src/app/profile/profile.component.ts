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

  /* Config micronutrientes chart */
  public chart1Options = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chart1Labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  public chart1Type = 'horizontalBar';

  public chart1Legend = true;  public chart1Data = [
    {data: [65, 59, 80, 81], label: 'Proteinas'},
    {data: [28, 48, 40, 19], label: 'Carbohidratos'},
    {data: [40, 50, 45, 10], label: 'Lipidos'}
  ];

  public chart1Options2 = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chart1Labels2 = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  public chart1Type2 = 'polarArea';

  public chart1Legend2 = true;  public chart1Data2 = [
    {data: [65, 59, 80, 81], label: 'Proteinas'},
    {data: [28, 48, 40, 19], label: 'Carbohidratos'},
    {data: [40, 50, 45, 10], label: 'Lipidos'}
  ];

  /* Config macronutrientes chart */

  public chart2Options = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chart2Labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  public chart2Type = 'pie';

  public chart2Legend = true;  public chart2Data = [
    {data: [65, 59, 80, 81], label: 'Proteinas'},
    {data: [28, 48, 40, 19], label: 'Carbohidratos'},
    {data: [40, 50, 45, 10], label: 'Lipidos'}
  ];


  public chart2Options2 = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chart2Labels2 = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  public chart2Type2 = 'line';

  public chart2Legend2 = true;  public chart2Data2 = [
    {data: [65, 59, 80, 81], label: 'Proteinas'},
    {data: [28, 48, 40, 19], label: 'Carbohidratos'},
    {data: [40, 50, 45, 10], label: 'Lipidos'}
  ];
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
