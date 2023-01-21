import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: Storage, private navController: NavController) {

  }

  async canActivate(){
    const isLogin = await this.storage.get('isLogin');

    if ( !isLogin ) {
      this.navController.navigateForward('/login')
      return false;
    }
    
    return true;
  }
  
}
