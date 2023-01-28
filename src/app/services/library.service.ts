import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  urlServer = "https://librarypca.fly.dev/";
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"}) };

  constructor( private http: HttpClient ) { }

  async getAuthors() {
    try {
      const req = await fetch(`${this.urlServer}authors`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  async getBooks(){
    try {
      const req = await fetch(`${this.urlServer}books`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true, message: 'No eres tú, somos nosotros. Intentalo mas tarde.' }
    } 
  }

  async getTopBooks(){
    try {
      const req = await fetch(`${this.urlServer}top_books`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true, message: 'No eres tú, somos nosotros. Intentalo mas tarde.' }
    } 
  }

  async getBooksAuthor(author_id:any) {
    try {
      const req = await fetch(`${this.urlServer}books_authors?author_id=${author_id}`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true, message: 'No eres tú, somos nosotros. Intentalo mas tarde.' }
    }
  }

  async getMyFavoriteBooks(user_id: any){
    try {
      const req = await fetch(`${this.urlServer}my_favorite_books?user_id=${user_id}`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true, message: 'No eres tú, somos nosotros. Intentalo mas tarde.' }
    }
  }

  async getCheckLikeBook(user_id: any, book_id: any){
    try {
      const req = await fetch(`${this.urlServer}check_favorite?user_id=${user_id}&book_id=${book_id}`)
      const res = await req.json();

      return { error: false, data: res }
    } catch (error) {
      console.log(error)
      return { error: true, message: 'No eres tú, somos nosotros. Intentalo mas tarde.' }
    }
  }

  likeBook(user_id: any, book_id: any){
    let params = {
      "favorite_book": {
        "user_id": user_id,
        "book_id": book_id
      }
    }
    return this.http.post(`${this.urlServer}favorite_books`,params, this.httpHeaders)
  }

  disLike(user_id: any, book_id: any){
    let params = {
      "favorite_book": {
        "user_id": user_id,
        "book_id": book_id
      }
    }
    return this.http.post(`${this.urlServer}dislike`, params, this.httpHeaders)
  }
}
