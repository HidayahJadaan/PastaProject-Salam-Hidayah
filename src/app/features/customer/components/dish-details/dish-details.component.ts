import { Component, OnInit } from '@angular/core';
import { PastaDish } from '../../../pasta/models/pasta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PastaService } from '../../../pasta/services/pasta.service';
import { IngredientsService } from '../../../ingredients/services/ingredients.service';
import { ServicesService } from '../../../orders/services/services.service';

@Component({
  selector: 'app-dish-details',
  standalone: false,
  templateUrl: './dish-details.component.html',
  styleUrl: './dish-details.component.scss',
})
export class DishDetailsComponent implements OnInit{
  dish: PastaDish | undefined;
  ingredients: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dishesService: PastaService,
    private ingredientsService: IngredientsService,
    private ordersService:ServicesService
  ) {}

  ngOnInit(): void {
    const dishId = this.route.snapshot.paramMap.get('id');

    if (dishId) {
      this.dishesService
        .getPastaDish(dishId)
        .then((dish) => {
          this.dish = dish;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });

      this.ingredientsService
        .getIngredientsByDishId(dishId)
        .then((ingredients) => {
          this.ingredients = ingredients;
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/customer','menu']);
  }

  orderDish(dish:PastaDish): void {
    // alert(`You have ordered ${this.dish?.name}!`);

    this.ordersService.addOrder(dish)
    .then((d)=>{
      console.log('Added');
      
      
    })

  }
}
