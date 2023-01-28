import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  urlServer = "https://librarypca.fly.dev/";
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"}) };

  constructor(
    private storage: Storage,
    private http: HttpClient,
  ) { }



  // loginUser(credentials: any) {
  //   return new Promise(async ( accept, reject ) => {

  //     const userData = await this.storage.get('user');
  //     const decryptPassword = atob(userData?.password || '');

  //     if( credentials.email != userData.email || credentials.password != decryptPassword ) return reject({
  //       error: true,
  //       message: 'Credenciales invalidas'
  //     })

  //     return accept({ error: false, message: 'Ok' })
  //   })
  // }

  // registerUser(userData: any) {
  //   this.storage.set("user", userData)
  //   return { error: false, message: 'Usuario registrado.' }
  // }

  loginUser(credentials: any) {
    let params = {
      "user": credentials
    }

    return new Promise(( accept, reject ) => {      
      this.http.post(`${this.urlServer}login`, params, this.httpHeaders).subscribe( (data: any) => {
        if (data.status == "OK") {
          return accept({ error: false, message: 'Ok', data })
        }else{
          return reject({
            error: true,
            message: data.errors
          })
        }
      }, (error) => {
        console.log(error)
        console.log(error)
        if ( error.status >= 400 && error.status < 500 ) {
          return reject({
            error: true,
            message: 'Contraseña incorrecta.'
          })
        }
        return reject({
          error: true,
          message: 'No eres tú, somos nosotros. Vuelve a intentarlo mas tarde.'
        })
      })
    })
  }

  registerUser(userData: any) {
    let params = {
      "user": userData
    }

    return new Promise( (accept, reject) => {
      this.http.post(`${this.urlServer}signup`,params, this.httpHeaders).subscribe((data: any) => {
        console.log(data)
        if (data.status == "OK"){
          return accept({ error: false, message: data.msg })
        }else{
          return reject({
            error: true,
            message: data.errors
          })
        }
      },(error) => {
        console.log(error)
        return reject({
          error: true,
          message: 'No eres tú, somos nosotros. Vuelve a intentarlo mas tarde.'
        })
      })
    })
  }
  
}
