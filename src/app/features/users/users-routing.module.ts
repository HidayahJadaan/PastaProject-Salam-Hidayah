import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { CanActivateUserType } from '../../guards/user-type.guard';
import { checkUserType } from './guards/user-type-fn.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: UsersListComponent,
  },
  {
    path: 'add',
    component: UsersFormComponent,
    // canActivate: [CanActivateUserType],
    canActivate:[checkUserType]
    // canActivate: [checkUserTypeFn]
  },
  {
    path: 'edit/:id',
    component: UsersFormComponent,
    // canActivate: [CanActivateUserType],
    // canActivate:[checkUserType]
  },
  {
    path: 'details/:id',
    component: UsersDetailsComponent,
  },
  {
    path: ':id/profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
