import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerMenuComponent } from './components/customer-menu/customer-menu.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { CustomerCookAtHomeComponent } from './components/customer-cook-at-home/customer-cook-at-home.component';

const routes: Routes = [
  // { path: '', component: CustomerHomeComponent },
  // { path: 'customer', component: CustomerHomeComponent },
  { path: 'profile', component: CustomerProfileComponent },
  { path: 'menu', component: CustomerMenuComponent },
  { path: 'dish/:id', component: DishDetailsComponent },
  { path: 'cart', component: CustomerCartComponent },
  { path: 'orders', component: CustomerOrdersComponent },
  { path: 'cookathome', component: CustomerCookAtHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
