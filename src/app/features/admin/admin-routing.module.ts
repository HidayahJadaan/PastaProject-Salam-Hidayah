import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { BranchesListComponent } from './components/branches-list/branches-list.component';
import { AdminChefsListComponent } from './components/admin-chefs-list/admin-chefs-list.component';
import { AdminAddPastasComponent } from './components/admin-add-pastas/admin-add-pastas.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ChefsFormComponent } from '../chef/components/chefs-form/chefs-form.component';

const routes: Routes = [
  { path: '', component: AdminDasboardComponent },
  { path: 'chefs/add', component: ChefsFormComponent },
  { path: 'chefs/edit/:id', component: ChefsFormComponent },
  { path: 'profile', component: AdminProfileComponent },
  { path: 'branches', component: BranchesListComponent },
  { path: 'chefs', component: AdminChefsListComponent },
  { path: 'admin-pastas-list', component: AdminAddPastasComponent },
  { path: 'ingredients', component: AdminIngredientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
