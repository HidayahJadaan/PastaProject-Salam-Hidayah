import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PastaRoutingModule } from '../pasta/pasta-routing.module';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
OrdersRoutingModule  ]
})
export class OrdersModule { }
