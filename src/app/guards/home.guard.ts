import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  async canActivate() {
    const isIntroShowed = await this.storage.get('isIntroShowed')    

    if (!isIntroShowed) {
      this.router.navigateByUrl('/intro');
      console.log('Mandalo pal la intro')
      return false
    }


    return true;
  }
  
}
