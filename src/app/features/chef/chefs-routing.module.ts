import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefDashboardComponent } from './components/chef-dashboard/chef-dashboard.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { IngredientsManageComponent } from './components/ingredients-manage/ingredients-manage.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ChefsFormComponent } from './components/chefs-form/chefs-form.component';

const routes: Routes = [
  { path: '', component: ChefDashboardComponent },
  // { path: 'add', component: ChefsFormComponent },
  // { path: 'edit/:id', component: ChefsFormComponent },
  { path: 'profile', component: ChefProfileComponent },
  { path: 'dishes', component: DishesListComponent },
  { path: 'dishes/add', component: AddDishComponent },
  { path: 'dishes/edit/:id', component: AddDishComponent },
  { path: 'ingredients/:dishId', component: IngredientsManageComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefsRoutingModule { }
