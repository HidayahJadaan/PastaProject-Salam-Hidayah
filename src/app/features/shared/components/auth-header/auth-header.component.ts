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
    // const remember = JSON.parse(localStorage.getItem('remember-me') ||'');

    // if (remember == 'true') {
    //   localStorage.removeItem('current-user');
    // } else {
    //   sessionStorage.removeItem('current-user');
    // }

    // this.router.navigate(['login']);


    this.authService.logout();
    
  }
}
