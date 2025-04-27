import { Component, OnInit } from '@angular/core';
import { IihStorageService } from '../../services/iih-storage.service';
import { AuthServiceService } from '../../features/shared/services/auth-service.service';
import User from '../../features/users/models/user.model';
import { Chef } from '../../features/chef/models/chef.model';
import { Customer } from '../../features/customer/models/customer.models';

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

    //Listen for user changes
    this.authService.userUpdated.subscribe((user: User | Chef | Customer| null) => {
      this.isLogin = !!user;
      this.userName = user?.name ?? null;
      // this.userType = user?.type ?? null;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // remove all listeners
    this.authService.userUpdated.unsubscribe();
  }


}
