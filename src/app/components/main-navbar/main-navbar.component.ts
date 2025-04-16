import { Component, OnInit } from '@angular/core';
import { IihStorageService } from '../../services/iih-storage.service';
import { AuthServiceService } from '../../features/shared/services/auth-service.service';

@Component({
  selector: 'app-main-navbar',
  standalone: false,
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent implements OnInit {
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
