import { Component, OnDestroy, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CustomersService } from '../../../features/customer/services/customers.service';
import { UserService } from '../../../features/users/services/user.service';
// import { register } from 'swiper/element/bundle';

// register();

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private usersService: UserService
  ) {}
  ngOnInit(): void {
    this.customersService.fillData();
    this.usersService.fillData();
  }
  toggleBanner() {
    const banner = document.querySelector('.banner');
    const header = document.querySelector('header');
    const bannerMiddle = document.querySelector('.banner-middle');
    const bannerRight = document.querySelector('.banner-right');

    banner?.classList.toggle('active');
    header?.classList.toggle('active');
    bannerMiddle?.classList.toggle('active');
    bannerRight?.classList.toggle('active');
  }


}
