import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Chef } from '../../models/chef.model';
import { ChefService } from '../../services/chef.service';
import { UserService } from '../../../users/services/user.service';
import User from '../../../users/models/user.model';

@Component({
  selector: 'app-chef-profile',
  standalone: false,
  templateUrl: './chef-profile.component.html',
  styleUrl: './chef-profile.component.scss',
})
export class ChefProfileComponent {
  id: string = '0';
  loading: boolean = false;
  error: string = '';
  user!: User;
  isEditing: boolean = false;
  originalUser!: User;

  constructor(
    private route: ActivatedRoute,
    private chefsService: ChefService,
    private usersService: UserService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const curr = this.authService.getCurrentUser();
    console.log('Current User:', curr);

    this.id = curr?.id;
    console.log('User ID:', this.id);

    if (this.id) {
      this.loading = true;

      this.usersService
        .getUsers(this.id)
        .then((chef: User) => {
          this.user = chef;
          this.originalUser = { ...chef };
        })
        .catch((err) => {
          this.error = 'Failed to load chef profile.';
          console.error('Error while loading chef:', err);
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
