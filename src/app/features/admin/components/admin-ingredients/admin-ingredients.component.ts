import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IngredientsService } from '../../../ingredients/services/ingredients.service';
import PaginatedResponse from '../../../shared/models/paginated-response.model';
import { Ingredient } from '../../../ingredients/models/ingredient.model';

@Component({
  selector: 'app-admin-ingredients',
  standalone: false,
  templateUrl: './admin-ingredients.component.html',
  styleUrl: './admin-ingredients.component.scss',
})
export class AdminIngredientsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingredientsService: IngredientsService
  ) {}

  ingredientId: string | null = null;
  name: string = '';
  description: string = '';
  quantity: string = '';
  unit: string = '';
  loading: boolean = false;
  errors: string[] = [];
  ingredients: Ingredient[] = [];
  success: string = '';
  loadingIngredients: boolean = false;
  loadingAssign: boolean = false;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.ingredientsService.fillData();
    this.loadingIngredients = true;

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = parseInt(queryParams['page'] || 1);

      this.loadIngredients();
    });
  } //end onInit

  loadIngredients(): void {
    this.loadingIngredients = true;
    this.ingredientsService
      .getIngredients(this.currentPage, this.pageSize)
      .then((response: PaginatedResponse<Ingredient>) => {
        if (this.currentPage > response.numberOfPages) {
          this.router.navigate(['/admin', 'ingredients'], {
            queryParams: { page: 1, pageSize: this.pageSize },
          });
        }

        this.ingredients = response.data;
        this.pages = [];

        for (let index = 1; index <= response.numberOfPages; index++) {
          this.pages.push(index);
        }

        this.loadingIngredients = false;
      });
  }// end loadIngredients()





  
}
