import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  }

  constructor() {}

}
