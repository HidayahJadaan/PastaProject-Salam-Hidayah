import { Component, OnInit } from '@angular/core';
import { PastaService } from '../../../pasta/services/pasta.service';
import { IngredientsService } from '../../../ingredients/services/ingredients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PastaDish } from '../../../pasta/models/pasta.model';
import PaginatedResponse from '../../../shared/models/paginated-response.model';

@Component({
  selector: 'app-customer-menu',
  standalone: false,
  templateUrl: './customer-menu.component.html',
  styleUrl: './customer-menu.component.scss',
})
export class CustomerMenuComponent implements OnInit {
  constructor(
    private dishesService: PastaService,
    private ingredientsService: IngredientsService,
    private route: ActivatedRoute,
    public router: Router
  ) {}
  selectedDishIngredients: any[] = [];
  showModal: boolean = false;

  dishes: PastaDish[] = []; //feach database
  filteredDishes: PastaDish[] = []; //feach database

  loading: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 7;

  ngOnInit(): void {
    this.dishesService.fillData();
    this.ingredientsService.fillData();
    this.loading = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadDishes();
    });
  }

  // ===========================

  loadDishes(): void {
    this.dishesService
      .getPastaDishes(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<PastaDish>) => {
        if (this.currentPage > response.numberOfPages) {
          this.router.navigate(['/customer', 'menu'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }

        this.dishes = response.data;
        this.filteredDishes = this.dishes;
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loading = false;
      });
  }

  filterDishes(filterType: string) {
    if (filterType === 'all') {
      this.filteredDishes = this.dishes;
    } else if (filterType === 'red') {
      this.filteredDishes = this.dishes.filter(
        (dish) => dish.souceColor === 'Red'
      );
    } else if (filterType === 'white') {
      this.filteredDishes = this.dishes.filter(
        (dish) => dish.souceColor === 'White'
      );
    } else if (filterType === 'vegetarian') {
      this.filteredDishes = this.dishes.filter(
        (dish) => dish.dietaryInfo2 === 'Vegetarian'
      );
    } else if (filterType === 'nonVegetarian') {
      this.filteredDishes = this.dishes.filter(
        (dish) => dish.dietaryInfo2 === 'Non-Vegetarian'
      );
    }
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

  viewDish(dish: PastaDish) {
    this.router.navigate(['/customer', 'dish', dish.id]);
  }
}
