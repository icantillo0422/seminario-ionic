import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router) {}

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  }

  slides = [
    {
      title: 'BUSCA',
      description: 'Busca y encuentra tus libros favoritos en un solo lugar 😎',
      img: './assets/images/home/slide-1.svg',
      hasAction: false,
      textButton: '',
      action: () => {}
    },
    {
      title: 'SELECCIONA',
      description: 'Selecciona los libros que deseas leer y audiolibros a escuchar 🔊🎧📚',
      img: './assets/images/home/slide-2.svg',
      hasAction: false,
      textButton: '',
      action: () => {}
    },
    {
      title: 'LEE Y DISFRUTA',
      description: 'Disfruta de toda tu selección, todos sin ningun costo 😱',
      img: './assets/images/home/slide-3.svg',
      hasAction: true,
      textButton: '¡Vamos!',
      action: () => {
        this.router.navigate(['/home'])
      }
    },
    {
      title: '¡SLIDE DE MAS!',
      description: 'Esto no va a estar en la APP',
      img: './assets/images/home/slide-3.svg',
      hasAction: false,
      textButton: '¡Vamos!',
      action: () => {}
    },
  ]

  ngOnInit() {
  }

}
