import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LibraryService } from '../services/library.service';
import { BookDetailModalPage } from '../book-detail-modal/book-detail-modal.page';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.page.html',
  styleUrls: ['./books-modal.page.scss'],
})
export class BooksModalPage implements OnInit {

  author: any;
  books: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private libraryService: LibraryService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    try {      
      this.author = this.navParams.get("author");
      const res = await this.libraryService.getBooksAuthor(this.author.id);
      this.books = res.data;
  
      if( res.error ) {
        const toast = await this.toastController.create({
  
          message: res.message,
          duration: 1500,
          position: 'bottom'
        });
    
        await toast.present();    
  
        return;
      }
    } catch (error: any) {
      const toast = await this.toastController.create({
        message: error.message,
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();    
    }       
  }

  closeModal(){
    this.modalController.dismiss();
  }

  async showBook(book: any){
    const modal = await this.modalController.create({
      component: BookDetailModalPage,
      componentProps: {
        book: book
      }
    });
    return await modal.present();
  }

}
