import { Component } from '@angular/core';
import User from '../../../users/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users/services/user.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss',
})
export class AdminProfileComponent {
  id: string = '0';
  loading: boolean = false;
  error: string = '';
  cuurUser!: User;
  isEditing: boolean = false;
  originalUser!: User;

  constructor(
    private route: ActivatedRoute,
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
        .then((user: User) => {
          this.cuurUser = user;
          this.originalUser = { ...user };
        })
        .catch((err) => {
          this.error = 'Failed to load Admin profile.';
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
    console.log('Saving:', this.cuurUser);
    this.isEditing = false;

    this.originalUser = { ...this.cuurUser };
    this.authService.setCurrentUser(this.originalUser)
  }

  cancelEdit(): void {
    this.cuurUser = { ...this.originalUser };
    this.isEditing = false;
  }
  editUserProfileInfo(): void {
    this.isEditing = true;
  }
}
