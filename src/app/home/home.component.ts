import { Component, OnInit } from '@angular/core';

/* NAVBAR */
import * as $ from 'jquery';
import * as AOS from 'aos';

/* DROPZONE */
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

  public foodDetection: string = null;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    createImageThumbnails: false
  };

  title = 'FoodABS';

  constructor(){
  }

  ngOnInit(): void {

    AOS.init();
    this.navBarScrollAnimation();
    $('.nav').addClass('header');
  }

  navBarScrollAnimation() {
    $(document).ready( () => {

      const div = $('nav');
      $(window).scroll( () => {
        if ($(window).scrollTop() >= 100) {

            /* CAMBIAR DE ESTADO LA NAVBAR */


            // div.removeClass("default-color");
            div.removeClass('navbar_transparent');
            div.addClass('navbar_withscroll');
            div.css('backgroundColor', 'white');
            $('#titulo').text('FoodABS');

            // div.css('transform','scale(1.0)')
            // div.css('transition','background 500ms');
            // div.animate({fontSize: '1.0em'}, "fast");
        } else {
            // div.addClass("default-color");

            /* */
            $('#titulo').text('');
            div.removeClass('navbar_withscroll');
            div.addClass('navbar_transparent');
            div.css('backgroundColor', 'transparent');
            // div.css('transform','scale(1.2)')
            // div.animate({fontSize: '1.2em'}, "fast");
        }
      });
    });
  }

  onUploadError(args: any) {

  }

  onUploadSuccess(args: any) {
    /* Si el archivo se subió correctamente, el servidor envia un JSON*/
    /* El JSON del servidor, se encuentra como segundo argumento de args (partiendo de cero) */
    console.log(args[1]);
    if (args[1] != null) {
      if (args[1].food_predict != null) {
        console.log(args[1].food_predict);
        this.foodDetection = this.capitalizeOnlyFirst(args[1].food_predict);
      }
    }
  }

  /* Funciones de preprocesamiento del JSON */
  capitalizeOnlyFirst(myString: string) {
    return (myString.charAt(0).toUpperCase() + myString.slice(1).toLowerCase()).replace(/_/g, ' ');
  }
}
