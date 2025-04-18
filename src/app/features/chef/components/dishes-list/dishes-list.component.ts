import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PastaService } from '../../../pasta/services/pasta.service';
import { PastaDish } from '../../../pasta/models/pasta.model';
import PaginatedResponse from '../../../shared/models/paginated-response.model';
import { IngredientsService } from '../../../ingredients/services/ingredients.service';

@Component({
  selector: 'app-dishes-list',
  standalone: false,
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss',
})
export class DishesListComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pastasDishesService: PastaService,
    private ingredientsService: IngredientsService
  ) {}
  selectedDishIngredients: any[] = [];
  showModal: boolean = false;

  dishes: PastaDish[] = []; //feach database

  loading: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.pastasDishesService.fillData();
    this.ingredientsService.fillData();
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
          this.router.navigate(['/chef', 'dishes'], {
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

  async viewDishIngredients(dishId: string): Promise<void> {
    console.log(dishId);
    
    try {
      this.selectedDishIngredients =
        await this.ingredientsService.getIngredientsByDishId(dishId);
      this.showModal = true;
    } catch (error) {
      console.error('Failed to load ingredients:', error);
    }

    console.log(this.selectedDishIngredients);
    
  }
}
