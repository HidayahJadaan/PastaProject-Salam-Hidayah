import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDasboardComponent } from './components/admin-dasboard/admin-dasboard.component';
import { BranchesListComponent } from './components/branches-list/branches-list.component';
import { AdminChefsListComponent } from './components/admin-chefs-list/admin-chefs-list.component';
import { AdminAddPastasComponent } from './components/admin-add-pastas/admin-add-pastas.component';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminDasboardComponent,
    BranchesListComponent,
    AdminChefsListComponent,
    AdminAddPastasComponent,
    AdminIngredientsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
