import { Injectable } from '@angular/core';
import { IihStorageService } from '../../../services/iih-storage.service';
import { Branch } from '../branch.model';
import PaginatedResponse from '../../shared/models/paginated-response.model';

const BRANCHES_LOCAL_STORAGE_KEY = 'branches-data';
const BRANCHES_FILLED = 'branches-filled';
@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private storageService: IihStorageService) {}

  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(BRANCHES_FILLED);

    if (!filled_status) {
      const branches: Branch[] = [
        {
          id: '1',
          name: 'First Branch',
          location: 'Amman, Khalda',
          chefs: ['3', '2'],
        },
        {
          id: '2',
          name: 'Second Branch',
          location: 'Irbid, Petra Street',
          chefs: ['1'],
        },
        {
          id: '3',
          name: 'Therd Branch',
          location: 'Amman, Dabouq',
          chefs: ['1', '3'],
        },
      ];

      // localStorage.clear();
      // Set and override branches array to localstorage database
      this.storageService.setItemInLocalStorage(
        BRANCHES_LOCAL_STORAGE_KEY,
        JSON.stringify(branches)
      );
      this.storageService.setItemInLocalStorage(
        BRANCHES_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ==================================================================
  getBranch(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Branch>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(Branchs.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: Branch[] = Branchs.slice(start, end);

        const response: PaginatedResponse<Branch> = {
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
  // ==================================================================
  getAllBranch(): Promise<Branch[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
       

        resolve(Branchs);
      }, 1500);
    });
  }
  // ========================================================

  addBranch(Branch: Branch): Promise<Branch> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
        Branch.id = '' + (Branchs.length + 1);

        Branchs.push(Branch);
        this.storageService.setItemInLocalStorage(
          BRANCHES_LOCAL_STORAGE_KEY,
          JSON.stringify(Branchs)
        );

        resolve(Branch);
      }, 1500);
    });
  }
  // ========================================================

  getBranches(id: string): Promise<Branch> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
        const Branch = Branchs.find((Branch: Branch) => Branch.id === id);
        if (Branch) {
          resolve(Branch);
        } else {
          reject('Branch dose not exist');
        }
      }, 1000);
    });
  }
  // ========================================================

  updateBranch(BranchUpadet: Branch): Promise<Branch> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
        let BranchIndex = Branchs.findIndex(
          (Branch: Branch) => Branch.id === BranchUpadet.id
        );
        if (BranchIndex != -1) {
          const Branch = (Branchs[BranchIndex] = { ...BranchUpadet });

          this.storageService.setItemInLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY,
            JSON.stringify(Branchs)
          );

          resolve(Branch);
        } else {
          reject('Branch dose not exist');
        }
      }, 1000);
    });
  }
  // ========================================================

  deleteBranch(BranchDeleted: Branch): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Branchs: Branch[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY
          ) || ''
        );
        let BranchIndex = Branchs.findIndex(
          (Branch: Branch) => Branch.id === BranchDeleted.id
        );
        if (BranchIndex != -1) {
          // const Branch = (Branchs[BranchIndex] = { ...BranchDeleted });
          // Branch.upadeeted_at = new Date();

          Branchs.splice(BranchIndex, 1);

          this.storageService.setItemInLocalStorage(
            BRANCHES_LOCAL_STORAGE_KEY,
            JSON.stringify(Branchs)
          );

          resolve(true);
        } else {
          reject('Branch dose not exist');
        }
      }, 500);
    });
  }
  // ==================================================================
}
