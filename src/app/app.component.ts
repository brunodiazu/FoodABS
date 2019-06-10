import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FoodABS';

  ngOnInit(): void {
    this.navBarScrollAnimation()
  }

  navBarScrollAnimation(){
    $(document).ready( () => {
      const div = $('nav');
      $(window).scroll( () => {
        if ($(window).scrollTop() >= 100) {
            // div.removeClass("default-color");
            div.removeClass('navbar_transparent');
            div.addClass('navbar_withscroll');
            div.css('backgroundColor', 'white');
            // div.css('transform','scale(1.0)')
            // div.css('transition','background 500ms');
            // div.animate({fontSize: '1.0em'}, "fast");
        } else {
            // div.addClass("default-color");

            div.removeClass('navbar_withscroll')
            div.addClass('navbar_transparent')
            div.css('backgroundColor','transparent');
            // div.css('transform','scale(1.2)')
            // div.animate({fontSize: '1.2em'}, "fast");
        }
      });
    })
  }
}
