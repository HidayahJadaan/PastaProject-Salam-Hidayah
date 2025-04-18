import { Injectable } from '@angular/core';
import { IihStorageService } from '../../../services/iih-storage.service';
import { Ingredient } from '../models/ingredient.model';
import PaginatedResponse from '../../shared/models/paginated-response.model';
const INGREDIENTS_LOCAL_STORAGE_KEY = 'ingredients-data';
const INGREDIENTS_FILLED = 'ingredients-filled';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private storageService: IihStorageService) {}

  // ================================
  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(INGREDIENTS_FILLED);

    if (!filled_status) {
     const ingredients: Ingredient[] = [
       {
         id: '1',
         name: 'Tomato Sauce',
         description:
           'Rich Italian-style tomato sauce made from fresh tomatoes',
         quantity: 200,
         unit: 'ml',
         linkedDishIds: ['1', '5'],
       },
       {
         id: '2',
         name: 'Spaghetti Pasta',
         description: 'Classic durum wheat spaghetti',
         quantity: 250,
         unit: 'grams',
         linkedDishIds: ['1'],
       },
       {
         id: '3',
         name: 'Parmesan Cheese',
         description: 'Grated aged parmesan cheese',
         quantity: 50,
         unit: 'grams',
         linkedDishIds: ['2', '3', '4'],
       },
       {
         id: '4',
         name: 'Basil Leaves',
         description: 'Fresh green basil for garnish',
         quantity: 5,
         unit: 'leaves',
         linkedDishIds: ['3'],
       },
       {
         id: '5',
         name: 'Olive Oil',
         description: 'Extra virgin olive oil',
         quantity: 2,
         unit: 'tbsp',
         linkedDishIds: ['3'],
       },
       {
         id: '6',
         name: 'Garlic',
         description: 'Minced fresh garlic cloves',
         quantity: 3,
         unit: 'cloves',
         linkedDishIds: ['4'],
       },
       {
         id: '7',
         name: 'Penne Pasta',
         description: 'Short tubular pasta ideal for holding sauce',
         quantity: 200,
         unit: 'grams',
         linkedDishIds: ['4', '1'],
       },
       {
         id: '8',
         name: 'Spinach',
         description: 'Fresh baby spinach leaves',
         quantity: 100,
         unit: 'grams',
         linkedDishIds: ['5'],
       },
       {
         id: '9',
         name: 'Feta Cheese',
         description: 'Crumbled feta cheese',
         quantity: 60,
         unit: 'grams',
         linkedDishIds: ['5', '2'],
       },
       {
         id: '10',
         name: 'Cream',
         description: 'Heavy cream for sauce',
         quantity: 150,
         unit: 'ml',
         linkedDishIds: ['2'],
       },
     ];


      // localStorage.clear();
      // Set and override Chefs array to localstorage database
      this.storageService.setItemInLocalStorage(
        INGREDIENTS_LOCAL_STORAGE_KEY,
        JSON.stringify(ingredients)
      );
      this.storageService.setItemInLocalStorage(
        INGREDIENTS_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ================================

  getIngredients(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Ingredient>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ingredients: Ingredient[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(ingredients.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: Ingredient[] = ingredients.slice(start, end);

        const response: PaginatedResponse<Ingredient> = {
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

  // addIngredient(ingredient: Ingredient): Promise<Ingredient> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const ingredients: Ingredient[] = JSON.parse(
  //         this.storageService.getItemFromLocalStorage(
  //           INGREDIENTS_LOCAL_STORAGE_KEY
  //         ) || ''
  //       );
  //       ingredient.id = '' + ingredients.length + 1;

  //       ingredients.push(ingredient);
  //       this.storageService.setItemInLocalStorage(
  //         INGREDIENTS_LOCAL_STORAGE_KEY,
  //         JSON.stringify(ingredients)
  //       );

  //       resolve(ingredient);
  //     }, 1500);
  //   });
  // }

  addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ingredients: Ingredient[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY
          ) || '[]'
        );
        ingredient.id = '' + (ingredients.length + 1); // fixed id calculation
        ingredients.push(ingredient);
        this.storageService.setItemInLocalStorage(
          INGREDIENTS_LOCAL_STORAGE_KEY,
          JSON.stringify(ingredients)
        );
        resolve(ingredient);
      }, 1500);
    });
  }

  // ================================
  getIngredient(id: string): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = this.storageService.getItemFromLocalStorage(
          INGREDIENTS_LOCAL_STORAGE_KEY
        );
        console.log('Raw data from local storage:', rawData);

        const ingredients: Ingredient[] = JSON.parse(rawData || '[]');
        console.log('Parsed ingredients:', ingredients);

        const ingredient: Ingredient | undefined = ingredients.find(
          (c: Ingredient) => c.id === id
        );
        console.log('Looking for ID:', id, 'Found:', ingredient);

        if (ingredient) {
          resolve(ingredient);
        } else {
          reject('Ingredient does not exist');
        }
      }, 1000);
    });
  }

  // ================================

  // getIngredientsByDishId(dishId: string | number): Promise<Ingredient[]> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const ingredientsData = this.storageService.getItemFromLocalStorage(
  //         INGREDIENTS_LOCAL_STORAGE_KEY
  //       );
  //       const ingredients: Ingredient[] = JSON.parse(ingredientsData || '[]');
  //       const filteredIngredients = ingredients.filter(
  //         (c: Ingredient) => c.linkedDishId === dishId
  //       );
  //       resolve(filteredIngredients);
  //     }, 500);
  //   });
  // }
  getIngredientsByDishId(dishId: string): Promise<Ingredient[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ingredientsData = this.storageService.getItemFromLocalStorage(
          INGREDIENTS_LOCAL_STORAGE_KEY
        );
        const ingredients: Ingredient[] = JSON.parse(ingredientsData || '[]');
        const filteredIngredients = ingredients.filter((ingredient) =>
          ingredient.linkedDishIds?.includes(String(dishId))
        );
        resolve(filteredIngredients);
      }, 500);
    });
  }

  // ================================

  updateIngredient(ingredientUpadet: Ingredient): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ingredients: Ingredient[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let ingredientIndex = ingredients.findIndex(
          (ingredient: Ingredient) => ingredient.id === ingredientUpadet.id
        );
        if (ingredientIndex != -1) {
          const ingredient:Ingredient = (ingredients[ingredientIndex] = {
            ...ingredientUpadet,
          });

          this.storageService.setItemInLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY,
            JSON.stringify(ingredients)
          );

          resolve(ingredient);
        } else {
          reject('Ingredient dose not exist');
        }
      }, 1000);
    });
  }

  // ================================

  deleteIngredient(ingredientDeleted: Ingredient): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ingredients: Ingredient[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY
          ) || ''
        );
        let ingredientIndex = ingredients.findIndex(
          (ingredient: Ingredient) => ingredient.id === ingredientDeleted.id
        );
        if (ingredientIndex != -1) {
          // const Chef = (Chefs[ChefIndex] = { ...ChefDeleted });
          // Chef.upadeeted_at = new Date();

          ingredients.splice(ingredientIndex, 1);

          this.storageService.setItemInLocalStorage(
            INGREDIENTS_LOCAL_STORAGE_KEY,
            JSON.stringify(ingredients)
          );

          resolve(true);
        } else {
          reject('Chef dose not exist');
        }
      }, 500);
    });
  }

  validateIngredientForm(
    name: string,
    description: string,
    quantity: number,
    unit: string
  ): string[] {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Name is required');
    }
    if (!description.trim()) {
      errors.push('Description is required');
    }
    if (!quantity || quantity <= 0) {
      errors.push('Quantity must be a positive number');
    }
    if (!unit.trim()) {
      errors.push('Unit is required');
    }

    return errors;
  }
}
