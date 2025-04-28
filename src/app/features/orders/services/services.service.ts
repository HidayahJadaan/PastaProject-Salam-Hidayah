import { Injectable } from '@angular/core';
import { IihStorageService } from '../../../services/iih-storage.service';
import { Orders } from '../models/order.models';
import { PastaDish } from '../../pasta/models/pasta.model';
import { AuthServiceService } from '../../shared/services/auth-service.service';

const  ORDER_LOCAL_STORAGE_KEY = 'order-data';
  const ORDER_FILLED = 'order-filled';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private storageService: IihStorageService,
    private authService:AuthServiceService
  ) {}
  // ================================
  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(ORDER_FILLED);

    if (!filled_status) {
    const orders: Orders[] = [
      {
        id: '1',
        costumerID:'3',
        DishID:'1',
        ingrediantID:  [],
        OrderType:'dish',
        OrderDate:new Date,
        Status:'pending',
        TotalPrice:8.99,
        DeliveryAddress: 'Amman',
      },
      
     
    ];

      // localStorage.clear();
      // Set and override dishes array to localstorage database
      this.storageService.setItemInLocalStorage(
        ORDER_LOCAL_STORAGE_KEY,
        JSON.stringify(orders)
      );
      this.storageService.setItemInLocalStorage(
        ORDER_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ================================

  // Get user orders by customerID
  getUserOrders(customerID: string): Promise<Orders[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders: Orders[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(ORDER_LOCAL_STORAGE_KEY) || '[]'
        );

        const userOrders = orders.filter(order => order.costumerID === customerID);

        resolve(userOrders);
      }, 1500);
    });
  }
  // ================================

  addOrder(order: PastaDish): Promise<Orders> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentCustomer = this.authService.getCurrentUser();
        const customerID = currentCustomer.id;
        if (!customerID) {
          reject('No customer is logged in');
          return;
        }

        const orders: Orders[] = JSON.parse(
          this.storageService.getItemFromLocalStorage('order-data') || '[]'
        );

        const newOrder: Orders = {
          id: '' + (orders.length + 1),
          costumerID: customerID,
          DishID: order.id,
          ingrediantID: order.ingredientIds || [],
          OrderType: 'dish',
          OrderDate: new Date(),
          Status: 'pending',
          TotalPrice: order.price || 0,
          DeliveryAddress: 'Amman',
        };

        orders.push(newOrder);

        this.storageService.setItemInLocalStorage('order-data', JSON.stringify(orders));
console.log(orders);

        resolve(newOrder);
      }, 1500);
    });
  }

  // ================================
 
}




