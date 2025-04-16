import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IihStorageService {

  constructor() { }

  getItemFromLocalStorage(key:string):any{
    return localStorage.getItem(key);
  }

  getItemFromSessionStorage(key:string):any{
    return sessionStorage.getItem(key);
  }


  setItemInLocalStorage(key:string, value:string):void{
    localStorage.setItem(key,value);
  }
}
