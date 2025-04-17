import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChefService } from '../../services/chef.service';
import { Chef } from '../../models/chef.model';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-chefs-form',
  standalone: false,
  templateUrl: './chefs-form.component.html',
  styleUrl: './chefs-form.component.scss',
})
export class ChefsFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private chefsService: ChefService,
    private usersService: UserService
  ) {}

  id: string | null = null;
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  specialization: string = '';
  loading: boolean = false;
  errors: string[] = [];
  success: string = '';
  loadingforGet: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadingforGet = true;
      this.chefsService
        .getChef(this.id)
        .then((user: Chef) => {
          this.loadingforGet = false;
          this.name = user.name;
          this.email = user.email;
        })
        .catch((erorr: string) => {
          this.loadingforGet = false;
          this.errors.push(erorr);
        });
    }
  } // END ONINT

  userSave(): void {
    this.loading = false;
    this.errors.length = 0; //reset data
    if (this.name.trim() && this.email.trim() && this.password.trim()) {
      //send data
      const user: Chef = {
        id: '' + Math.random(),
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        type: 'chef',
      };
      this.loading = true;
      if (this.id) {
        user.id = this.id;
        this.chefsService
          .updateChefs(user)
          .then((user: Chef) => {
            (this.loading = false),
              (this.success = 'Chef updated successfully');
          })
          .catch((error: string) => {
            (this.loading = false), this.errors.push(error);
          });
      } else {
        this.chefsService.addChef(user).then((user: Chef) => {
          (this.loading = false), (this.success = 'Chef added successfully');
        });
      }
    } else {
      this.errors.push(
        ...this.chefsService.validateChefForm(
          this.name,
          this.email,
          this.phone,
          this.password,
          this.specialization
        )
      );
    }
  }
}
