import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.page.html',
  styleUrls: ['./book-detail-modal.page.scss'],
})
export class BookDetailModalPage implements OnInit {
  book: any;
  like_button: boolean = false;
  user_id: any;
  
  constructor( 
    private navParams: NavParams,
    private modalController: ModalController,
    private storage: Storage,
    private libraryService: LibraryService,
    private toastController: ToastController,
     ) { }

  async ngOnInit() {
    try {
      this.book = this.navParams.get("book");
      this.user_id = await this.storage.get("user_id");

      const res = await this.libraryService.getCheckLikeBook(this.user_id, this.book.id);

      this.like_button = res.data.like
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

  like(){
    this.libraryService.likeBook(this.user_id, this.book.id).subscribe((data:any) => {
      this.like_button = true;
    }, (error) =>
    console.log(error)
    )
  }
  disLike(){
    this.libraryService.disLike(this.user_id, this.book.id).subscribe((data:any) => {
      if (data.status == "OK"){
        this.like_button = false
      }
    }, (error) => 
      console.log(error)
    )
  }
}