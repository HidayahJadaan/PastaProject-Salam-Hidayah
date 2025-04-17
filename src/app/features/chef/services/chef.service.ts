import { Injectable } from '@angular/core';
import { Chef } from '../models/chef.model';
import { IihStorageService } from '../../../services/iih-storage.service';
import PaginatedResponse from '../../shared/models/paginated-response.model';
const CHEFS_LOCAL_STORAGE_KEY = 'chefs-data';
const CHEFS_FILLED = 'chefs-filled';
@Injectable({
  providedIn: 'root',
})
export class ChefService {
  constructor(private storageService: IihStorageService) {}


  // ================================
  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(CHEFS_FILLED);

    if (!filled_status) {
      const chefs: Chef[] = [
        {
          id: '1',
          name: 'Chef Amal',
          phone: '0791234567',
          email: 'amal@pasta.com',
          password: '123',
          specialization: 'Italian',
          branchId: '1',
          type: 'chef',
        },

        {
          id: '2',
          name: 'Chef Ahmad',
          phone: '0791234567',
          email: 'ahmad@gmail.com',
          password: '123',
          type: 'chef',
          specialization: 'Italian',
          branchId: '2',
        },
      ];

      // localStorage.clear();
      // Set and override Chefs array to localstorage database
      this.storageService.setItemInLocalStorage(
        CHEFS_LOCAL_STORAGE_KEY,
        JSON.stringify(chefs)
      );
      this.storageService.setItemInLocalStorage(
        CHEFS_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ================================

  getChefs(page: number, pageSize: number): Promise<PaginatedResponse<Chef>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chefs: Chef[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(chefs.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: Chef[] = chefs.slice(start, end);

        const response: PaginatedResponse<Chef> = {
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

  addChef(chef: Chef): Promise<Chef> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chefs: Chef[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY
          ) || ''
        );
        chef.id = '' + chefs.length + 1;

        chefs.push(chef);
        this.storageService.setItemInLocalStorage(
          CHEFS_LOCAL_STORAGE_KEY,
          JSON.stringify(chefs)
        );

        resolve(chef);
      }, 1500);
    });
  }
  // ================================
  getChef(id: string): Promise<Chef> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = this.storageService.getItemFromLocalStorage(
          CHEFS_LOCAL_STORAGE_KEY
        );
        console.log('Raw data from local storage:', rawData);

        const chefs: Chef[] = JSON.parse(rawData || '[]');
        console.log('Parsed chefs:', chefs);

        const chef: Chef | undefined = chefs.find((c: Chef) => c.id === id);
        console.log('Looking for ID:', id, 'Found:', chef);

        if (chef) {
          resolve(chef);
        } else {
          reject('Chef does not exist');
        }
      }, 1000);
    });
  }

  // ================================

  getChefsByBranch(branchId: string): Promise<Chef[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chefsData = this.storageService.getItemFromLocalStorage(
          CHEFS_LOCAL_STORAGE_KEY
        );
        const chefs: Chef[] = JSON.parse(chefsData || '[]');
        const filteredChefs = chefs.filter(
          (c: Chef) => c.branchId === branchId
        );
        resolve(filteredChefs);
      }, 500);
    });
  }

  // ================================

  updateChefs(ChefUpadet: Chef): Promise<Chef> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chefs: Chef[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let ChefIndex = chefs.findIndex(
          (Chef: Chef) => Chef.id === ChefUpadet.id
        );
        if (ChefIndex != -1) {
          const Chef = (chefs[ChefIndex] = { ...ChefUpadet });

          this.storageService.setItemInLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY,
            JSON.stringify(chefs)
          );

          resolve(Chef);
        } else {
          reject('Chef dose not exist');
        }
      }, 1000);
    });
  }

  // ================================

  deleteChef(ChefDeleted: Chef): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Chefs: Chef[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let ChefIndex = Chefs.findIndex(
          (Chef: Chef) => Chef.id === ChefDeleted.id
        );
        if (ChefIndex != -1) {
          // const Chef = (Chefs[ChefIndex] = { ...ChefDeleted });
          // Chef.upadeeted_at = new Date();

          Chefs.splice(ChefIndex, 1);

          this.storageService.setItemInLocalStorage(
            CHEFS_LOCAL_STORAGE_KEY,
            JSON.stringify(Chefs)
          );

          resolve(true);
        } else {
          reject('Chef dose not exist');
        }
      }, 500);
    });
  }

  validateChefForm(name: string, email: string,phone:string ,password: string, specialization:string): string[] {
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
    if (!specialization.trim()) {
      errors.push('Specialization Address is required');
    }
    if (!password.trim()) {
      errors.push('Password is required');
    }
    return errors;
  }

}
