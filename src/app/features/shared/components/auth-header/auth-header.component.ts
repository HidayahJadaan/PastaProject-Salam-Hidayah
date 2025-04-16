import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-auth-header',
  standalone: false,
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss',
})
export class AuthHeaderComponent {
  // constructor(private router: Router) {}
  isLogin: boolean = false;
  userName: string | null = null;
  userType: string | null = null;

  constructor(private authService: AuthServiceService) {}
  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.isLogin = true;
      this.userName = user.name;
      this.userType = user.type;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLogin = false;
    this.userName = null;
  }
}
