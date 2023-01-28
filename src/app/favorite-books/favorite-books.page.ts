import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { ModalController, ToastController } from '@ionic/angular';
import { BookDetailModalPage } from '../book-detail-modal/book-detail-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.page.html',
  styleUrls: ['./favorite-books.page.scss'],
})
export class FavoriteBooksPage implements OnInit {

  books: any;

  constructor(
    private libraryService: LibraryService,
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: Storage,
    ) { }

  async ngOnInit() {
    try {      
      const userId = await this.storage.get("user_id");
      const res = await this.libraryService.getMyFavoriteBooks(userId);
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
