import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
// import { addUser, getUsers, updateUsers } from '../../database/users';
import { addUser, getUsers, updateUsers } from '../../database/users-localStorage';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-form',
  standalone: false,
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent  implements OnInit{

 id:string|null=null;
name: string='';
email: string='';
password: string='';
loading:boolean=false;
errors: string[]=[];//لما يعبي داتا و كان يطلع غلط كل مرة يعمل ايرور لهيك عملنا من نوع ااري 
success:string=''; 
loadingforGet:boolean=false;

constructor(private route:ActivatedRoute, private usersService:UserService){

}

ngOnInit(): void { 
 this.id=this.route.snapshot.paramMap.get('id'); 
 if(this.id){ 
  this.loadingforGet=true;
  this.usersService.getUsers(this.id)
  .then((user:User)=>{ 
    this.loadingforGet=false;
      this.name=user.name;
      this.email=user.email; 
  })
  .catch((erorr:string)=>{ 
    this.loadingforGet=false;
    this.errors.push(erorr)
  })

 }
}

userSave() :void {
   this.loading=false;
   this.errors.length=0; //reset data 
  if(this.name.trim()&&this.email.trim()&&this.password.trim()){
    //send data
    const user:User={
    name:this.name,
    email:this.email,
    password:this.password

    } 
    this.loading=true;
    if(this.id){ 
      user.id=this.id;
     this.usersService
       .updateUsers(user)
       .then((user: User) => {
         (this.loading = false), (this.success = 'User updated successfully');
       })
       .catch((error: string) => {
         (this.loading = false), this.errors.push(error);
       });

    }
    else{
      this.usersService.addUser(user).then((user: User) => {
        (this.loading = false), (this.success = 'User added successfully');
      });
    }
   
  } 
  else{
    // if(!this.name.trim()){
    //   this.errors.push('Name is required')
    // }
    // if(!this.email.trim()){
    //   this.errors.push('Emaill Address is required')
    // } 
    // if(!this.password.trim()){
    //   this.errors.push('Password is required')
    // }

   this.errors.push(...this.usersService.validateUserForm(this.name, this.email, this.password));
  }
  }

}
