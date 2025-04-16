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

  constructor(private authService:AuthServiceService){}

  logoutClick(): void {
   

    this.authService.logout();
    
  }

  getUserCredentials():any{
    let userCred = this.authService.getCurrentUser();
    // console.log(userName.name);
    return userCred;

  }




}
