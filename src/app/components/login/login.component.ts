import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { loginUsers } from '../../features/users/database/users';
import User from '../../features/users/models/user.model';
import { AuthServiceService } from '../../features/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  rememberMe: boolean = false;
  success: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
    const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');

    let currentUser = null;
    if (remember == 'true') {
      currentUser = JSON.parse(localStorage.getItem('current-user') || '');
    } else {
      currentUser = JSON.parse(sessionStorage.getItem('current-user') || '');
    }

    if (currentUser) {
      this.router.navigate(['users']);
    }
  }

  userLogin(): void {
    this.error = '';
    this.success = false;

    if (this.email.trim() && this.password.trim()) {
      this.success = true;
      this.authService
        .loginUser(this.email, this.password)
        .then((user: User) => {
          this.success = false;
          console.log(this.email);

          alert(`Welcome user:${user.name}`);
          localStorage.setItem('remember-me', JSON.stringify(this.rememberMe));

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

          this.router.navigate(['users']);
        })
        .catch((error: string) => {
          this.success = false;
          this.error = error;
        });
    } else {
      this.error = 'Invalid Email and Password';
    }
  }
}
