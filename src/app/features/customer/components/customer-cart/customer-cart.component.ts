import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-cart',
  standalone: false,
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.scss'
})
export class CustomerCartComponent {
  orderStatus = 'preparing'; 

  cartItems: any[] = []; 

  isActive(status: string): boolean {
    const steps = ['pending', 'accepted', 'preparing', 'ready', 'delivered'];
    return steps.indexOf(status) <= steps.indexOf(this.orderStatus.toLowerCase());
  }

  checkout() {
    alert("Payment successful! Thank you for your order.");
    this.cartItems = [];
  }
}
