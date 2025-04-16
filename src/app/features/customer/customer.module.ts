import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerMenuComponent } from './components/customer-menu/customer-menu.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { CustomerCookAtHomeComponent } from './components/customer-cook-at-home/customer-cook-at-home.component';
import { CustomersRoutingModule } from './customers-routing.module';



@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerProfileComponent,
    CustomerMenuComponent,
    DishDetailsComponent,
    CustomerCartComponent,
    CustomerOrdersComponent,
    CustomerCookAtHomeComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomerModule { }
