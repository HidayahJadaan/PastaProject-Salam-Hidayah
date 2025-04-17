import { Component } from '@angular/core';
import { PastaDish } from '../../../pasta/models/pasta.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PastaService } from '../../../pasta/services/pasta.service';
import PaginatedResponse from '../../../shared/models/paginated-response.model';

@Component({
  selector: 'app-admin-pastas-list',
  standalone: false,
  templateUrl: './admin-pastas-list.component.html',
  styleUrl: './admin-pastas-list.component.scss',
})
export class AdminPastasListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pastasDishesService: PastaService
  ) {}
  selectedBranchChefs: any[] = [];
  showModal: boolean = false;

  dishes: PastaDish[] = []; //feach database

  loading: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.pastasDishesService.fillData();
    this.loading = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadDishes();
    });
  }

  // ===========================

  loadDishes(): void {
    this.pastasDishesService
      .getPastaDishes(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<PastaDish>) => {
        if (this.currentPage > response.numberOfPages) {
          this.router.navigate(['/admin','admin-pastas-list'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }

        this.dishes = response.data;
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loading = false;
      });
  }

  
  closeModal() {
    this.showModal = false;
  }

 
  
}
