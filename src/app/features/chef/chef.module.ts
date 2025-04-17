import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefDashboardComponent } from './components/chef-dashboard/chef-dashboard.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { IngredientsManageComponent } from './components/ingredients-manage/ingredients-manage.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ChefsRoutingModule } from './chefs-routing.module';
import { FormsModule } from '@angular/forms';
import { HidePasswordPipe } from '../shared/pipes/hide-password.pipe';
import { ChefService } from './services/chef.service';



@NgModule({
  declarations: [
    ChefDashboardComponent,
    ChefProfileComponent,
    DishesListComponent,
    AddDishComponent,
    IngredientsManageComponent,
    OrdersComponent,
   
  ],
  imports: [CommonModule, ChefsRoutingModule, FormsModule],
  providers:[{provide: ChefService, useClass:ChefService}]
})
export class ChefModule {}
