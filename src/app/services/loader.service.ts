import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  isLoading = false;

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
