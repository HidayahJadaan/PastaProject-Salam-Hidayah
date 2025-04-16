import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import User from '../../models/user.model';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  id: string | null = '';
  loading: boolean = false;
  error: string = '';
  user!: User;
  isEditing: boolean = false;
  originalUser!: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.user = this.authService.getCurrentUser();
      // Clone original
      this.originalUser = { ...this.user };
      this.loading = false;
    } else {
      this.error = 'Invalid user id';
    }
  }

  saveChanges(): void {
    // Call service to update user info if needed
    console.log('Saving:', this.user);
    this.isEditing = false;
    // update saved state
    this.originalUser = { ...this.user };
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser }; // Revert changes
    this.isEditing = false;
  }
  editUserProfileInfo(): void {
    this.isEditing = true;
  }
}
