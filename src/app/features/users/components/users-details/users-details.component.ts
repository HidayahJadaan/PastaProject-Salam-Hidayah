import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
// import { getUsers } from '../../database/users';
import { getUsers } from '../../database/users-localStorage';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-details',
  standalone: false,
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent implements OnInit { 
 id :string |null='';
  loading:boolean=false;
error: string=''; 
user!:User;
constructor(private route:ActivatedRoute, private usersService:UserService){

} 
  ngOnInit(): void {
  this.id=this.route.snapshot.paramMap.get('id');
   if(this.id){
    this.loading=true;
    this.usersService.getUsers(this.id)
      .then((user: User) => {
        this.loading = false;
        this.user = user;
      })
      .catch((error: string) => {
        this.loading = false;
        this.error = error;
      });
   }else{
    this.error='Invalid user id';
   }
  }



}
