import { Injectable } from '@angular/core';
import User from '../models/user.model';
import PaginatedResponse from '../../shared/models/paginated-response.model';
import { IihStorageService } from '../../../services/iih-storage.service';

const USERS_LOCAL_STORAGE_KEY = 'users-data';
const USERS_FILLED = 'users-filled';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: IihStorageService) {}

  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(USERS_FILLED);

    if (!filled_status) {
      const users: User[] = [
        {
          id: '1',
          name: 'Hidayah Jadaan',
          email: 'hidayah@gmail.com',
          password: '123',
          type: 'admin',
        },
        {
          id: '2',
          name: 'Abdullah Omar',
          email: 'abd@gmail.com',
          password: '123',
          type: 'chef',
        },
        {
          id: '3',
          name: 'Heba Khalil',
          email: 'heba@gmail.com',
          password: '123',
          type: 'customer',
        },
      ];

      // localStorage.clear();
      // Set and override users array to localstorage database
      this.storageService.setItemInLocalStorage(
        USERS_LOCAL_STORAGE_KEY,
        JSON.stringify(users)
      );
      this.storageService.setItemInLocalStorage(
        USERS_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ========================================================
  getUser(page: number, pageSize: number): Promise<PaginatedResponse<User>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(users.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: User[] = users.slice(start, end);

        const response: PaginatedResponse<User> = {
          page,
          numberOfPages,
          totalNumberOfItems,
          data: items,
        };

        resolve(response);
      }, 1500);
    });
  }
  // ========================================================

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        user.id = '' + (users.length + 1);

        users.push(user);
        this.storageService.setItemInLocalStorage(
          USERS_LOCAL_STORAGE_KEY,
          JSON.stringify(users)
        );

        resolve(user);
      }, 1500);
    });
  }
  // ========================================================

  getUsers(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const user = users.find((user: User) => user.id === id);
        if (user) {
          resolve(user);
        } else {
          reject('User dose not exist');
        }
      }, 1000);
    });
  }
  // ========================================================

  updateUsers(userUpadet: User): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let userIndex = users.findIndex(
          (user: User) => user.id === userUpadet.id
        );
        if (userIndex != -1) {
          const user = (users[userIndex] = { ...userUpadet });

          this.storageService.setItemInLocalStorage(
            USERS_LOCAL_STORAGE_KEY,
            JSON.stringify(users)
          );

          resolve(user);
        } else {
          reject('User dose not exist');
        }
      }, 1000);
    });
  }
  // ========================================================

  deleteUser(userDeleted: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let userIndex = users.findIndex(
          (user: User) => user.id === userDeleted.id
        );
        if (userIndex != -1) {
          // const user = (users[userIndex] = { ...userDeleted });
          // user.upadeeted_at = new Date();

          users.splice(userIndex, 1);

          this.storageService.setItemInLocalStorage(
            USERS_LOCAL_STORAGE_KEY,
            JSON.stringify(users)
          );

          resolve(true);
        } else {
          reject('User dose not exist');
        }
      }, 500);
    });
  }
  // ========================================================

  loginUsers(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || '[]'
        );
        const user = users.find(
          (user: User) => user.email === email && user.password === password
        );
        if (user) {
          resolve(user);
        } else {
          reject('Incorrect Email Address or Password');
        }
      }, 1000);
    });
  }
  // ========================================================

  validateUserForm(name: string, email: string, password: string): string[] {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Name is required');
    }
    if (!email.trim()) {
      errors.push('Emaill Address is required');
    }
    if (!password.trim()) {
      errors.push('Password is required');
    }
    return errors;
  }
  // ========================================================

  registerUser = (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: User[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            USERS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const existingUser = users.find((u: User) => u.email === user.email);
        if (existingUser) {
          return reject('Email already in use');
        }

        user.id = '' + (users.length + 1);

        users.push(user);
        resolve(user);
      }, 2000);
    });
  };
}

