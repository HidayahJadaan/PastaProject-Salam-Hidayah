import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { BranchesListComponent } from './components/branches-list/branches-list.component';
import { AdminChefsListComponent } from './components/admin-chefs-list/admin-chefs-list.component';
import { AdminPastasListComponent } from './components/admin-pastas-list/admin-pastas-list.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminPastasFormComponent } from './components/admin-pastas-form/admin-pastas-form.component';

@NgModule({
  declarations: [
    AdminDasboardComponent,
    BranchesListComponent,
    AdminChefsListComponent,
    AdminIngredientsComponent,
    AdminProfileComponent,
    AdminPastasFormComponent,
    AdminPastasListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
