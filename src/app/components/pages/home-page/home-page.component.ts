import { Component, OnDestroy, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CustomersService } from '../../../features/customer/services/customers.service';
import { UserService } from '../../../features/users/services/user.service';
import { AuthServiceService } from '../../../features/shared/services/auth-service.service';
import { Customer } from '../../../features/customer/models/customer.models';
import { Chef } from '../../../features/chef/models/chef.model';
import User from '../../../features/users/models/user.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { register } from 'swiper/element/bundle';

// register();

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private usersService: UserService,
    private authService: AuthServiceService
  ) {}
  menuActive: boolean = false;
  bannerActive: boolean = false;

  isLogin: boolean = false;
  userName: string | null = null;
  userType: string | null = null;


  ngOnInit(): void {
    this.customersService.fillData();
    this.usersService.fillData();

    const user = this.authService.getCurrentUser();
    if (user) {
      this.isLogin = true;
      this.userName = user.name;
      this.userType = user.type;
    }

    //Listen for user changes
    this.authService.userUpdated.subscribe(
      (user: User | Chef | Customer | null) => {
        this.isLogin = !!user;
        this.userName = user?.name ?? null;
        // this.userType = user?.type ?? null;
      }
    );
  }
  // toggleBanner() {
  //   const banner = document.querySelector('.banner');
  //   const header = document.querySelector('header');
  //   const bannerMiddle = document.querySelector('.banner-middle');
  //   const bannerRight = document.querySelector('.banner-right');

  //   banner?.classList.toggle('active');
  //   header?.classList.toggle('active');
  //   bannerMiddle?.classList.toggle('active');
  //   bannerRight?.classList.toggle('active');
  // }
  // // toggle menu
  // toggleMenu() {
  //   const navMobile = document.querySelector('.nav-mobile');
  //   const menu = document.querySelector('.menu');

  //   if (navMobile && menu) {
  //     navMobile.classList.toggle('active');
  //     menu.classList.toggle('active');
  //     this.menuActive = !this.menuActive;
  //   }
  // }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // remove all listeners
    this.authService.userUpdated.unsubscribe();
  }

  toggleBanner() {
    this.bannerActive = !this.bannerActive;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
