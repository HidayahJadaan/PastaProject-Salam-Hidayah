import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersFormComponent,
    UsersDetailsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule ,
  
],
providers:[
  {provide: UserService, useClass:UserService}
]
})
export class UsersModule { }
