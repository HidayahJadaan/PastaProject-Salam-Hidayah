import { Component, OnInit } from '@angular/core';
import { IihStorageService } from '../../services/iih-storage.service';
import { AuthServiceService } from '../../features/shared/services/auth-service.service';

@Component({
  selector: 'app-main-navbar',
  standalone: false,
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent implements OnInit{
  isLogin: boolean = false;
  constructor(private authService:AuthServiceService){}
  ngOnInit(): void {
   console.log(
    this.authService.getCurrentUser());
   
    
  }

  checkIfIsLogin(): void {

    
  }
}
