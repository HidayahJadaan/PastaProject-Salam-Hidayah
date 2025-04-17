import { Component, OnInit } from '@angular/core';
import { Chef } from '../../../chef/models/chef.model';
import { ChefService } from '../../../chef/services/chef.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import PaginatedResponse from '../../../shared/models/paginated-response.model';
import { BranchesService } from '../../../branch/services/branches.service';
import { Branch } from '../../../branch/models/branch.model';

@Component({
  selector: 'app-admin-chefs-list',
  standalone: false,
  templateUrl: './admin-chefs-list.component.html',
  styleUrl: './admin-chefs-list.component.scss',
})
export class AdminChefsListComponent implements OnInit {
  constructor(
    private chefsService: ChefService,
    private route: ActivatedRoute,
    private branchesService: BranchesService,
    private router: Router
  ) {}
  chefs: Chef[] = []; //feach database
  branches: Branch[] = []; //feach database
  loading: boolean = false;
  loadingChefs: boolean = false;
  loadingAssign: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;
  selectedBranchChefs: any[] = [];
  showModal: boolean = false;
  // =================
  selectedChefId: string = '';
  selectedBranchId: string = '';

  // =================

  ngOnInit(): void {
    this.chefsService.fillData();
    this.branchesService.fillData();
    this.loadingChefs = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadChefs();
    });
  }

  loadChefs(): void {
    this.loadingChefs = true;
    this.chefsService
      .getChefs(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<Chef>) => {
        if (this.currentPage > response.numberOfPages) {
          this.router.navigate(['branches'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }

        this.chefs = response.data;
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loadingChefs = false;
      });
  }
  // =========================================================
  closeModal() {
    this.showModal = false;
  }

  // =========================================================
  assignChefToBranchClick(chefId: string): void {
    this.showModal = true;
    this.loading = true;
    this.selectedChefId = chefId;
    this.branchesService
      .getAllBranch()
      .then((branchess: Branch[]) => {
        console.log(branchess);
        this.branches = branchess;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching Branches:', error);
      });
  }
  // =========================================================

  confirmAssignBranch(): void {
    let chefToAssign!: Chef;
    if (this.selectedChefId && this.selectedBranchId) {
      this.loadingAssign = true;
      this.chefsService
        .getChef(this.selectedChefId)
        .then((selectedChef: Chef) => {
          chefToAssign = selectedChef;
          chefToAssign.branchId = this.selectedBranchId;

          return this.chefsService
            .updateChefs(chefToAssign)
            .then(() => {
              chefToAssign.branchId = this.selectedBranchId;
              this.selectedChefId = '';
              this.selectedBranchId = '';
              this.loadChefs();
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to assign chef:', error);
            });
        })
        .catch((error) => {
          console.error('Invalid Chef Id:', error);
        })
        .finally(() => {
          this.loadingAssign = false;
        });
    }
  }

  chefEditClick(chef: Chef): void {
    this.router.navigate(['/admin', 'chefs', 'edit', chef.id]);
  }

  handleDeleteChef(chef: Chef): void {
    this.chefsService.deleteChef(chef).then(() => {
      alert('Chef ' + chef.name + ' Deleted Successfully');
      this.loadChefs();
    });
  }
}
