import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { BranchesListComponent } from './components/branches-list/branches-list.component';
import { AdminChefsListComponent } from './components/admin-chefs-list/admin-chefs-list.component';
import { AdminAddPastasComponent } from './components/admin-add-pastas/admin-add-pastas.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';

const routes: Routes = [
  { path: '', component: AdminDasboardComponent },
  // { path: 'admin', component: AdminDasboardComponent },
  { path: 'branches', component: BranchesListComponent },
  { path: 'chefs', component: AdminChefsListComponent },
  { path: 'admin-add-pasta', component: AdminAddPastasComponent },
  { path: 'ingredients', component: AdminIngredientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
