import { Component, OnInit } from '@angular/core';
// import { getUser } from '../../database/users';
import { deleteUser, fillData, getUser } from '../../database/users-localStorage';
import User from '../../models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import PaginatedResponse from '../../../shared/models/paginated-response.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private usersService:UserService) {}

  users: User[] = []; //feach database
  loading: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.usersService.fillData();
    this.loading = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.usersService
      .getUser(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<User>) => {
        if (this.currentPage > response.numberOfPages) {
          // this.currentPage = 1;
          // this.loadUsers();

          this.router.navigate(['users', 'list'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }
        this.users = response.data; //بعمل نسخة من الاري يلي عندي [...array] اذابدي انه الاري م تتاثر
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loading = false;
      });
  }

  deletUserClick(user: User): void {
let currentUser = null;
const remember = JSON.parse(localStorage.getItem('remember-me') || 'false');

if (remember == 'true') {
   currentUser = JSON.parse(localStorage.getItem('current-user') || '');
} else {
   currentUser = JSON.parse(sessionStorage.getItem('current-user') || '');
}

if (currentUser && currentUser.type === 'admin'){
 this.usersService
   .deleteUser(user)
   .then(() => {
     alert(`user ${user.name} deleted succesfuliy`);
     this.loadUsers();
   })
   .catch((reason: string) => {
     alert(reason);
   });
}
 

  }

  editUser(user: User): void {
    this.router.navigate(['users', 'edit', user.id]);
  }
}
