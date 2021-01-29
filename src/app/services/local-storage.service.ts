import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  postData (nameInLocalStorage:string, toPost:any):void {
    let dataToLocalStorage = JSON.stringify (toPost);
    window.localStorage.setItem(nameInLocalStorage, dataToLocalStorage);
  }

}
