import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { UserService } from '../../../users/services/user.service';
import User from '../../../users/models/user.model';

@Component({
  selector: 'app-customer-profile',
  standalone: false,
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit {
 id: string='0';
  loading: boolean = false;
  error: string = '';
  user!: User;
  isEditing: boolean = false;
  originalUser!: User;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private router: Router,
    private authService:AuthServiceService,
    private usersServices:UserService
  ) {}

   ngOnInit(): void {
    const curr = this.authService.getCurrentUser();
    console.log('Current User:', curr);

    this.id = curr?.id;
    console.log('User ID:', this.id);

    if (this.id) {
      this.loading = true;

      this.usersServices
        .getUsers(this.id)
        .then((customer: User) => {
          console.log(this.id);

          this.user = customer;
          this.originalUser = { ...customer };
        })
        .catch((err: any) => {
          this.error = 'Failed to load customer profile.';
          console.error('Error while loading customer:', err);
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.error = 'Invalid user id';
    }


  }

  saveChanges(): void {
    
    console.log('Saving:', this.user);
    this.isEditing = false;
   
    this.originalUser = { ...this.user };
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser }; 
    this.isEditing = false;
  }
  editUserProfileInfo(): void {
    this.isEditing = true;
  }
}
