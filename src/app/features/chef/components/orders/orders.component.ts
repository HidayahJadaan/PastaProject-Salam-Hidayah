import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../orders/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Orders } from '../../../orders/models/order.models';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  constructor(
    private customersOrdersService: ServicesService,
    private route: ActivatedRoute,
    public router: Router,
    private ordersService: ServicesService,
    private authService: AuthServiceService
  ) {}
  myorders: Orders[] = [];
  orders: any[] = [];
  loading = true;
  ngOnInit(): void {
    this.customersOrdersService.fillData();

    this.ordersService.fillData();
    // setInterval(() => {
    //   this.loadOrders(); 
    // }, 5000);
      this.loadOrders(); 
  }


   
  // ==============================================
  loadOrders(): void {
    this.customersOrdersService.getAllOrders().then((o: Orders[]) => {
      this.orders = o;
      this.loading = false; 
    });
  }







}
