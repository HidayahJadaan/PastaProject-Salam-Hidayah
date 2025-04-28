import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../orders/models/order.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../../orders/services/services.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-customer-orders',
  standalone: false,
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit {
   myorders: Orders[] =[];
    orders: any[] = [];
    loading = true;

    constructor(
      private route: ActivatedRoute,
      public router: Router,
      private ordersService:ServicesService,
      private authService:AuthServiceService
    ) {}
  ngOnInit(): void {

this.ordersService.fillData()
this.loadOrders();
  }
   
  loadOrders():void{
const currentUser = this.authService.getCurrentUser();
const userId = currentUser.id;

if(userId){

  this.ordersService.getUserOrders(userId).then((response: Orders[]) => {
    this.myorders = response;
    this.loading = false;
  });
}

  }
  getTotalPrice(): number {
    return this.myorders.reduce((total, order) => total + order.TotalPrice, 0);
  }
  
  goToCart(): void {
    this.router.navigate(['/customer', 'cart']);
  }
  

}
