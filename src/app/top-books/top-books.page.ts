import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { ModalController, ToastController } from '@ionic/angular';
import { BookDetailModalPage } from '../book-detail-modal/book-detail-modal.page';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.page.html',
  styleUrls: ['./top-books.page.scss'],
})
export class TopBooksPage implements OnInit {

  books: any;

  constructor(
    private libraryService: LibraryService,
    private modalController: ModalController,
    private toastController: ToastController,
    ) { }

  async ngOnInit() {
    try {      
      const res = await this.libraryService.getTopBooks();
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
