import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Chef } from '../../models/chef.model';
import { ChefService } from '../../services/chef.service';

@Component({
  selector: 'app-chef-profile',
  standalone: false,
  templateUrl: './chef-profile.component.html',
  styleUrl: './chef-profile.component.scss',
})
export class ChefProfileComponent {
  id: string='0';
  loading: boolean = false;
  error: string = '';
  user!: Chef;
  isEditing: boolean = false;
  originalUser!: Chef;

  constructor(
    private route: ActivatedRoute,
    private chefsService: ChefService,
    private router: Router,
    private authService:AuthServiceService
  ) {}

   ngOnInit(): void {
    const curr = this.authService.getCurrentUser();
    console.log('Current User:', curr);

    this.id = curr?.id;
    console.log('User ID:', this.id);

    if (this.id) {
      this.loading = true;

      this.chefsService
        .getChef(this.id)
        .then((chef: Chef) => {
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
