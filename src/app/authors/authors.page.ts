import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthorDetailPage } from '../author-detail/author-detail.page';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
})
export class AuthorsPage implements OnInit {

  authors: any;

  constructor(
    private libraryService: LibraryService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {
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
      component: AuthorDetailPage,
      componentProps: {
        author: author
      }
    });
    return await modal.present();
  }

}
