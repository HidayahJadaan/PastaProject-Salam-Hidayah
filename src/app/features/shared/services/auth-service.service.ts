import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../users/models/user.model';
import { UserService } from '../../users/services/user.service';
const USERS_LOCAL_STORAGE_KEY = 'users-data';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private userService: UserService) {

    this.userService.fillData();
  }

  logout(): void {
    // const remember = JSON.parse(localStorage.getItem('remember-me') || '');

    // if (remember == 'true') {
      localStorage.removeItem('current-user');
      localStorage.removeItem('remember-me');
      // } else {
        sessionStorage.removeItem('current-user');
        sessionStorage.removeItem('remember-me');
    // }

    this.router.navigate(['login']);
  }
  // ================================
  loginUser(email: string, password: string): Promise<User> {
    return this.userService.loginUsers(email, password).then((user: User) => {
      const remember = JSON.parse(
        localStorage.getItem('remember-me') || 'false'
      );
      if (remember) {
        localStorage.setItem('current-user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('current-user', JSON.stringify(user));
      }
      return user;
    });
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('current-user') ||
      !!sessionStorage.getItem('current-user')
    );
  }
}
