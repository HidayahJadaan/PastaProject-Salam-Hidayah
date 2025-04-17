import { Component } from '@angular/core';
import { BranchesService } from '../../../branch/services/branches.service';
import { Branch } from '../../../branch/branch.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import PaginatedResponse from '../../../shared/models/paginated-response.model';
import { ChefService } from '../../../chef/services/chef.service';
import { Chef } from '../../../chef/models/chef.model';

@Component({
  selector: 'app-branches-list',
  standalone: false,
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss',
})
export class BranchesListComponent {
  constructor(
    private router: Router,
    private branchesService: BranchesService,
    private route: ActivatedRoute,
    private chefsService: ChefService
  ) {}
  selectedBranchChefs: any[] = [];
  showModal: boolean = false;

  branches: Branch[] = []; //feach database
  chefs: Chef[] = []; //feach database
  loading: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.branchesService.fillData();
    this.chefsService.fillData();
    this.loading = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadBranches();
    });
  }

  // ===========================

  loadBranches(): void {
    this.branchesService
      .getBranch(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<Branch>) => {
        if (this.currentPage > response.numberOfPages) {
          this.router.navigate(['branches'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }

        this.branches = response.data;
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loading = false;
      });
  }

  // viewChefs(chefs: any[]) {
  //   this.selectedBranchChefs = chefs;
  //   this.showModal = true;
  // }

  closeModal() {
    this.showModal = false;
  }

  viewChefsOfBranch(branchId: string): void {
    this.showModal = true;

    this.chefsService
      .getChefsByBranch(branchId)
      .then((chefs) => {
        this.selectedBranchChefs = chefs;
      })
      .catch((error) => {
        console.error('Error fetching chefs:', error);
      });
  }
}
