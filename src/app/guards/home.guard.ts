import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage, private navController: NavController) {}

  async canActivate() {
    const isLogin = await this.storage.get('isLogin')    

    if (isLogin) {
      this.navController.navigateForward('/menu')
      return false
    }


    return true;
  }
  
}
