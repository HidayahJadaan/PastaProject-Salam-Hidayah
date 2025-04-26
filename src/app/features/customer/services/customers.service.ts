import { Injectable } from '@angular/core';
import { IihStorageService } from '../../../services/iih-storage.service';
import { Customer } from '../models/customer.models';
import PaginatedResponse from '../../shared/models/paginated-response.model';
const CUSTOMERS_LOCAL_STORAGE_KEY = 'customers-data';
const CUSTOMERS_FILLED = 'customers-filled';
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private storageService: IihStorageService) {}

  // ================================
  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(CUSTOMERS_FILLED);

    if (!filled_status) {
      const customers: Customer[] = [
        {
          id: '1111',
          name: 'Salam Hani',
          phone: '0791234567',
          email: 'salam@gmail.com',
          password: '123',
          address: 'Irbid',
        },

        {
          id: '2222',
          name: 'Duaa Hani',
          phone: '0791234567',
          email: 'duaa@gmail.com',
          password: '123',
          address: 'Amman',
        },
      ];

      // localStorage.clear();
      // Set and override Chefs array to localstorage database
      this.storageService.setItemInLocalStorage(
        CUSTOMERS_LOCAL_STORAGE_KEY,
        JSON.stringify(customers)
      );
      this.storageService.setItemInLocalStorage(
        CUSTOMERS_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ================================

  getCustomers(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Customer>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers: Customer[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(customers.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: Customer[] = customers.slice(start, end);

        const response: PaginatedResponse<Customer> = {
          page,
          numberOfPages,
          totalNumberOfItems,
          data: items,
        };

        resolve(response);
      }, 1500);
    });
  }
  // ================================

  addCustomer(customer: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers: Customer[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        customer.id = '' + customers.length + 1;

        customers.push(customer);
        this.storageService.setItemInLocalStorage(
          CUSTOMERS_LOCAL_STORAGE_KEY,
          JSON.stringify(customers)
        );

        resolve(customer);
      }, 1500);
    });
  }
  // ================================
  getCustomer(id: string): Promise<Customer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = this.storageService.getItemFromLocalStorage(
          CUSTOMERS_LOCAL_STORAGE_KEY
        );
        console.log('Raw data from local storage:', rawData);

        const customers: Customer[] = JSON.parse(rawData || '[]');
        console.log('Parsed customers:', customers);

        const customer: Customer | undefined = customers.find(
          (c: Customer) => c.id === id
        );
        console.log('Looking for ID:', id, 'Found:', customer);

        if (customer) {
          resolve(customer);
        } else {
          reject('customer does not exist');
        }
      }, 1000);
    });
  }

  // ================================

  // ================================

  updateCustomer(customerUpadet: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers: Customer[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let customerIndex = customers.findIndex(
          (customer: Customer) => customer.id === customerUpadet.id
        );
        if (customerIndex != -1) {
          const customer = (customers[customerIndex] = { ...customerUpadet });

          this.storageService.setItemInLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY,
            JSON.stringify(customers)
          );

          resolve(customer);
        } else {
          reject('customer dose not exist');
        }
      }, 1000);
    });
  }

  // ================================

  deleteCustomer(customerDeleted: Customer): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers: Customer[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let customerIndex = customers.findIndex(
          (customer: Customer) => customer.id === customerDeleted.id
        );
        if (customerIndex != -1) {
          // const Chef = (Chefs[ChefIndex] = { ...ChefDeleted });
          // Chef.upadeeted_at = new Date();

          customers.splice(customerIndex, 1);

          this.storageService.setItemInLocalStorage(
            CUSTOMERS_LOCAL_STORAGE_KEY,
            JSON.stringify(customers)
          );

          resolve(true);
        } else {
          reject('customer dose not exist');
        }
      }, 500);
    });
  }
  // ================================

  validateCustomerForm(
    name: string,
    email: string,
    phone: string,
    password: string,
    address: string
  ): string[] {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Name is required');
    }
    if (!email.trim()) {
      errors.push('Emaill Address is required');
    }
    if (!phone.trim()) {
      errors.push('Phone Address is required');
    }
    if (!address.trim()) {
      errors.push('Address is required');
    }
    if (!password.trim()) {
      errors.push('Password is required');
    }
    return errors;
  }
}
