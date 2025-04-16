import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastasListComponent } from './components/pastas-list/pastas-list.component';

const routes: Routes = [

  {
    path: 'pastasList',
    component: PastasListComponent,
  },
  //   {
  //     path: 'add',
  //     component: UsersFormComponent,
  //     // canActivate: [CanActivateUserType],
  //     canActivate: [checkUserType],
  //     // canActivate: [checkUserTypeFn]
  //   },
  //   {
  //     path: 'edit/:id',
  //     component: UsersFormComponent,
  //     // canActivate: [CanActivateUserType],
  //     // canActivate:[checkUserType]
  //   },
  //   {
  //     path: 'details/:id',
  //     component: UsersDetailsComponent,
  //   },
  //   {
  //     path: ':id/profile',
  //     component: UserProfileComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
