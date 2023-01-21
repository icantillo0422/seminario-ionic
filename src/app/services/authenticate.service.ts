import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credentials: any) {
    return new Promise(async ( accept, reject ) => {

      const userData = await this.storage.get('user');
      const decryptPassword = atob(userData?.password || '');

      if( credentials.email != userData.email || credentials.password != decryptPassword ) return reject({
        error: true,
        message: 'Credenciales invalidas'
      })

      return accept({ error: false, message: 'Ok' })
    })
  }

  registerUser(userData: any) {
    this.storage.set("user", userData)
    return { error: false, message: 'Usuario registrado.' }
  }
  
}
