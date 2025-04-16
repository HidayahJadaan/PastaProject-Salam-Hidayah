import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IihStorageService } from '../../../services/iih-storage.service';
import { inject } from '@angular/core';

export const checkUserType: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const storageService = inject(IihStorageService);
    let currentUser = JSON.parse(storageService.getItemFromLocalStorage('current-user'));

//   console.log(currentUser.type);

const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');

// let currentUser = null;
if (remember == 'true') {
  currentUser = JSON.parse(localStorage.getItem('current-user') || '');
} else {
  currentUser = JSON.parse(sessionStorage.getItem('current-user') || '');
}
  
   if(currentUser && currentUser.type === 'admin') {
      console.log('currentUser1', currentUser)
      return true;
    }
    console.log('currentUser2', currentUser)
    console.log('currentUser2', currentUser.type)
    return false;

};
