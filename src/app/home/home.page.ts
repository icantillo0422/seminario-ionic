import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { ToastController, ModalController, NavController, MenuController } from '@ionic/angular';
import { BooksModalPage } from '../books-modal/books-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private libraryService: LibraryService, 
    private toastController: ToastController,
    private modalController: ModalController,
    private navCtrl: NavController,
    private menu: MenuController,
  ) {}  

  authors: any;

  cards = [
    { title: 'Autores',   icon: 'people-outline', action: () => this.goToAuthors() },
    { title: 'Libros',    icon: 'book-outline',   action: () => this.goToBooks() },
    { title: 'Favoritos', icon: 'heart-outline',  action: () => this.goToMyFavorites() },
    { title: 'Top libros',    icon: 'list-outline',   action: () => this.goToTopBooks() },
  ]

  slideOptions = {
    slidesPerView: 3,
    speed: 400,
  }

  async ionViewDidEnter(){
    const res = await this.libraryService.getAuthors();

    if( res.error ) {
      const toast = await this.toastController.create({

        message: 'No eres tú, somos nosotros. Intentalo mas tarde.',
        duration: 1500,
        position: 'bottom'
      });

      await toast.present();    

      return;
    }

    this.authors = res.data
  }

  async showBooks(author:any) {
    const modal = await this.modalController.create({
      component: BooksModalPage,
      componentProps: {
        author: author
      }
    });
    return await modal.present();
  }

  goToAuthors(){
    this.navCtrl.navigateForward("/menu/authors");
    this.menu.close();
  }

  goToBooks(){
    this.navCtrl.navigateForward("/menu/books");
    this.menu.close();
  }

  goToMyFavorites(){
    this.navCtrl.navigateForward("/menu/favorite-books");
    this.menu.close();
  }

  goToTopBooks(){
    this.navCtrl.navigateForward("/menu/top-books");
    this.menu.close();
  }
}
