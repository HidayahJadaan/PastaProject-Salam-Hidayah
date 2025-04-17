import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { BranchesListComponent } from './components/branches-list/branches-list.component';
import { AdminChefsListComponent } from './components/admin-chefs-list/admin-chefs-list.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ChefsFormComponent } from '../chef/components/chefs-form/chefs-form.component';
import { BranchFormComponent } from '../branch/components/branch-form/branch-form.component';
import { AdminPastasFormComponent } from './components/admin-pastas-form/admin-pastas-form.component';
import { AdminPastasListComponent } from './components/admin-pastas-list/admin-pastas-list.component';

const routes: Routes = [
  { path: '', component: AdminDasboardComponent },
  { path: 'chefs/add', component: ChefsFormComponent },
  { path: 'chefs/edit/:id', component: ChefsFormComponent },
  { path: 'profile', component: AdminProfileComponent },
  { path: 'branches', component: BranchesListComponent },
  { path: 'branches/add', component: BranchFormComponent },
  { path: 'branches/edit/:id', component: BranchFormComponent },
  { path: 'chefs', component: AdminChefsListComponent },
  { path: 'admin-pastas-list', component: AdminPastasListComponent },
  { path: 'pastas/add', component: AdminPastasFormComponent },
  // { path: 'pastas/edit/:id', component: AdminPastasFormComponent },
  { path: 'ingredients', component: AdminIngredientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
