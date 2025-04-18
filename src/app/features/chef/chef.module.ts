import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefDashboardComponent } from './components/chef-dashboard/chef-dashboard.component';
import { ChefProfileComponent } from './components/chef-profile/chef-profile.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { IngredientsManageComponent } from './components/ingredients-manage/ingredients-manage.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ChefsRoutingModule } from './chefs-routing.module';
import { HidePasswordPipe } from '../shared/pipes/hide-password.pipe';
import { ChefService } from './services/chef.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChefsFormComponent } from './components/chefs-form/chefs-form.component';



@NgModule({
  declarations: [
    ChefDashboardComponent,
    ChefProfileComponent,
    DishesListComponent,
    AddDishComponent,
    IngredientsManageComponent,
    OrdersComponent,
    ChefsFormComponent
   
  ],
  imports: [CommonModule, FormsModule,ChefsRoutingModule,RouterModule],
  providers:[{provide: ChefService, useClass:ChefService}]
})
export class ChefModule {}
