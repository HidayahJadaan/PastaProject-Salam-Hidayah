import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { loginUsers } from '../../features/users/database/users';
import User from '../../../features/users/models/user.model';
import { AuthServiceService } from '../../../features/shared/services/auth-service.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userName: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  rememberMe: boolean = false;
  success: boolean = false;
  isLogin: boolean = true; // default is login mode

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');
    let currentUser = null;

    if (remember == true) {
      currentUser = JSON.parse(localStorage.getItem('current-user') || '');
    } else {
      currentUser = JSON.parse(sessionStorage.getItem('current-user') || '');
    }

    if (currentUser) {
      this.redirectUser(currentUser);
    }
  }

  submitForm(): void {
    this.error = '';
    this.success = false;

    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Email and password are required.';
      return;
    }

    if (this.isLogin) {
      this.loginUser();
    } else {
      this.registerNewUser();
    }
  }

  loginUser(): void {
    this.success = true;
    this.loaderService.show();
    setTimeout(() => {
      this.authService
        .loginUser(this.email, this.password)
        .then((user: User) => {
          this.success = false;
          this.loaderService.hide();
          alert(`Welcome back, ${user.name}`);
          localStorage.setItem('remember-me', JSON.stringify(this.rememberMe));
          this.saveUserSession(user);
          this.redirectUser(user);
        })
        .catch((error: string) => {
          this.success = false;
          this.loaderService.hide();
          this.error = error;
        });
    }, 100);
  }

  registerNewUser(): void {
    this.loaderService.show();

    if (!this.userName.trim()) {
      this.error = 'Name is required for registration.';
      return;
    }

    const users = localStorage.getItem('users-data') || '';
    console.log(users);

    const newUser: User = {
      id: '' + (users.length + 1),
      name: this.userName,
      email: this.email,
      password: this.password,
      type: 'customer',
    };
    setTimeout(() => {
      this.authService
        .registerUser(newUser)
        .then((user: User) => {
          alert(`Registration successful! Welcome ${user.name}`);
          this.loaderService.hide();
          localStorage.setItem('remember-me', JSON.stringify(this.rememberMe));
          this.saveUserSession(user);
          this.redirectUser(user);
        })
        .catch((error: string) => {
          this.loaderService.hide();
          this.error = error;
        });
    }, 100);
  }

  saveUserSession(user: User): void {
    const userToSave = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      password: user.password,
    };

    if (this.rememberMe) {
      localStorage.setItem('current-user', JSON.stringify(userToSave));
    } else {
      sessionStorage.setItem('current-user', JSON.stringify(userToSave));
    }
  }

  redirectUser(user: any): void {
    if (user.type === 'admin') {
      this.router.navigate(['/admin']);
    } else if (user.type === 'chef') {
      this.router.navigate(['/chef']);
    } else if (user.type === 'customer') {
      this.router.navigate(['/']);
    }
  }

  toggleLoginRegister(): void {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.success = false;
  }
}
