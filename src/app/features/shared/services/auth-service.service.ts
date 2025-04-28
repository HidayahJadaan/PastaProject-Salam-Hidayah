import { EventEmitter, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../users/models/user.model';
import { UserService } from '../../users/services/user.service';
const USERS_LOCAL_STORAGE_KEY = 'users-data';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userUpdated = new EventEmitter<User | null>();

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
localStorage.clear();
    // this.userUpdated.emit(null);
    this.router.navigate(['/auth']);
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
      // this.userUpdated.emit(user);
      return user;
    });
  }

  // ================================
  registerUser(user: User): Promise<User> {
    return this.userService.registerUser(user).then((user: User) => {
      return user;
    });
  }

  // ====================================
  getCurrentUser(): any {
    const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');
    if (remember) {
      const currentUser = JSON.parse(
        localStorage.getItem('current-user') || ''
      );
      return currentUser;
    } else {
      const currentUser = JSON.parse(
        sessionStorage.getItem('current-user') || ''
      );
      return currentUser;
    }
  }
  // ======================
  setCurrentUser(user: User): void {
    const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');
    const userStr = JSON.stringify(user);
    if (remember) {
      localStorage.setItem('current-user', userStr);
    } else {
      sessionStorage.setItem('current-user', userStr);
    }

    // this.userUpdated.emit(user); 
  }

  // ======================
  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('current-user') ||
      !!sessionStorage.getItem('current-user')
    );
  }
}
