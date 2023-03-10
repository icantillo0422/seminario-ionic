import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  async canActivate() {
    const isIntroShowed = await this.storage.get('isIntroShowed')    

    if (isIntroShowed) {
      this.router.navigateByUrl('/login');
      return false
    }


    return true;
  }
  
}
