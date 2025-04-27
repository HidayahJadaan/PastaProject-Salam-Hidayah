import { Injectable } from "@angular/core";
import { PastaDish } from "../models/pasta.model";
import { IihStorageService } from "../../../services/iih-storage.service";
import PaginatedResponse from "../../shared/models/paginated-response.model";
const  PASTA_LOCAL_STORAGE_KEY = 'pasta-dishes-data';
  const PASTA_FILLED = 'pasta-dishes-filled';
@Injectable({ providedIn: 'root' })
export class PastaService {
  constructor(private storageService: IihStorageService) {}
  // ================================
  fillData() {
    const filled_status =
      !!this.storageService.getItemFromLocalStorage(PASTA_FILLED);

    if (!filled_status) {
    const dishes: PastaDish[] = [
      {
        id: '1',
        name: 'Classic Spaghetti Bolognese',
        description: 'Traditional Italian pasta with a rich meat sauce.',
        image: 'assets/images/ClassicSpaghettiBolognese.jpg',
        price: 8.99,
        chefId: 101,
        pastaType: 'Spaghetti',
        dietaryInfo: 'Contains gluten, dairy, and beef',
        ingredientIds: ['1', '2', '3'],
      },
      {
        id: '2',
        name: 'Creamy Fettuccine Alfredo',
        description: 'Fettuccine pasta tossed in a creamy Alfredo sauce.',
        image: 'assets/images/creamyAlfredo01.jpg',
        price: 10.49,
        chefId: 102,
        pastaType: 'Fettuccine',
        dietaryInfo: 'Vegetarian, contains dairy and gluten',
        ingredientIds: ['3', '4', '5'],
      },
      {
        id: '3',
        name: 'Pesto Penne',
        description: 'Penne pasta with a fresh basil pesto sauce.',
        image: 'assets/images/pestoPenne01.jpg',
        price: 9.25,
        chefId: 101,
        pastaType: 'Penne',
        dietaryInfo: 'Vegetarian, contains nuts and gluten',
        ingredientIds: ['6', '7'],
      },
      {
        id: '4',
        name: 'Seafood Linguine',
        description:
          'Linguine pasta with shrimp, clams, and mussels in a tomato garlic sauce.',
        image: 'assets/images/seafood01.jpg',
        price: 13.5,
        chefId: 103,
        pastaType: 'Linguine',
        dietaryInfo: 'Contains shellfish, gluten',
        ingredientIds: ['2', '8', '9'],
      },
      {
        id: '5',
        name: 'Vegan Mac & Cheese',
        description: 'Creamy vegan macaroni and cheese with cashew sauce.',
        image: 'assets/images/veganMac01.jpg',
        price: 7.99,
        chefId: 104,
        pastaType: 'Macaroni',
        dietaryInfo: 'Vegan, contains nuts and gluten',
        ingredientIds: ['10', '11'],
      },
      {
        id: '6',
        name: 'Vegan Mac & Cheese',
        description: 'Creamy vegan macaroni and cheese with cashew sauce.',
        image: 'assets/images/veganMac01.jpg',
        price: 7.99,
        chefId: 104,
        pastaType: 'Macaroni',
        dietaryInfo: 'Vegan, contains nuts and gluten',
        ingredientIds: ['10', '11'],
      },
      {
        id: '7',
        name: 'Vegan Mac & Cheese',
        description: 'Creamy vegan macaroni and cheese with cashew sauce.',
        image: 'assets/images/veganMac01.jpg',
        price: 7.99,
        chefId: 104,
        pastaType: 'Macaroni',
        dietaryInfo: 'Vegan, contains nuts and gluten',
        ingredientIds: ['10', '11'],
      },
    ];

      // localStorage.clear();
      // Set and override dishes array to localstorage database
      this.storageService.setItemInLocalStorage(
        PASTA_LOCAL_STORAGE_KEY,
        JSON.stringify(dishes)
      );
      this.storageService.setItemInLocalStorage(
        PASTA_FILLED,
        JSON.stringify('true')
      );
    }
  }
  // ================================

  getPastaDishes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<PastaDish>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dishes: PastaDish[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            PASTA_LOCAL_STORAGE_KEY
          ) || ''
        );
        const numberOfPages: number = Math.ceil(dishes.length / pageSize);
        const totalNumberOfItems: number = 0;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items: PastaDish[] = dishes.slice(start, end);

        const response: PaginatedResponse<PastaDish> = {
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

  addPastaDish(dish: PastaDish): Promise<PastaDish> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dishes: PastaDish[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            PASTA_LOCAL_STORAGE_KEY
          ) || ''
        );
        dish.id = '' + dishes.length + 1;

        dishes.push(dish);
        this.storageService.setItemInLocalStorage(
          PASTA_LOCAL_STORAGE_KEY,
          JSON.stringify(dishes)
        );

        resolve(dish);
      }, 1500);
    });
  }
  // ================================
  getPastaDish(id: string): Promise<PastaDish> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = this.storageService.getItemFromLocalStorage(
          PASTA_LOCAL_STORAGE_KEY
        );
        console.log('Raw data from local storage:', rawData);

        const dishes: PastaDish[] = JSON.parse(rawData || '[]');
        console.log('Parsed dishes:', dishes);

        const dish: PastaDish | undefined = dishes.find(
          (c: PastaDish) => c.id === id
        );
        console.log('Looking for ID:', id, 'Found:', dish);

        if (dish) {
          resolve(dish);
        } else {
          reject('Pasta Dish does not exist');
        }
      }, 1000);
    });
  }

  // ================================

  getIngredientsByDishId(dishId: string): Promise<PastaDish[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dishesData = this.storageService.getItemFromLocalStorage(
          PASTA_LOCAL_STORAGE_KEY
        );
        const dishes: PastaDish[] = JSON.parse(dishesData || '[]');
        const filtereddishes = dishes.filter((c: PastaDish) => c.id === dishId);
        resolve(filtereddishes);
      }, 500);
    });
  }

  // ================================

  updatePastaDish(dishUpadet: PastaDish): Promise<PastaDish> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dishes: PastaDish[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            PASTA_LOCAL_STORAGE_KEY
          ) || ''
        );
        let dishIndex = dishes.findIndex(
          (dish: PastaDish) => dish.id === dishUpadet.id
        );
        if (dishIndex != -1) {
          const dish = (dishes[dishIndex] = { ...dishUpadet });

          this.storageService.setItemInLocalStorage(
            PASTA_LOCAL_STORAGE_KEY,
            JSON.stringify(dishes)
          );

          resolve(dish);
        } else {
          reject('Pasta Dish dose not exist');
        }
      }, 1000);
    });
  }

  // ================================

  deletePastaDish(dishDeleted: PastaDish): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dishes: PastaDish[] = JSON.parse(
          this.storageService.getItemFromLocalStorage(
            PASTA_LOCAL_STORAGE_KEY
          ) || ''
        );
        let dishIndex = dishes.findIndex(
          (Chef: PastaDish) => Chef.id === dishDeleted.id
        );
        if (dishIndex != -1) {
          // const Chef = (dishes[ChefIndex] = { ...ChefDeleted });
          // Chef.upadeeted_at = new Date();

          dishes.splice(dishIndex, 1);

          this.storageService.setItemInLocalStorage(
            PASTA_LOCAL_STORAGE_KEY,
            JSON.stringify(dishes)
          );

          resolve(true);
        } else {
          reject('Pasta Dish not exist');
        }
      }, 500);
    });
  }
  // ==============================================
  // getDishesWithIngredients(): PastaDish[] {
  //   const dishes = this.getPastaDishes();
  //   const ingredients = this.ingredientService.getIngredients();

  //   return dishes.map((dish) => ({
  //     ...dish,
  //     ingredients: ingredients.filter((ing) =>
  //       ing.linkedDishIds.includes(dish.id)
  //     ),
  //   }));
  // }

  // ==============================================
  validatePastaDishForm(
    name: string,
    desc: string,
    image: File | null,
    price: number,
    pastaType: string,
    dietryInfo: string
  ): string[] {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('Dish Name is required');
    }
    if (!desc.trim()) {
      errors.push('Description is required');
    }
    if (!image) {
      errors.push('Phone is required');
    }
    if (!price) {
      errors.push('Price is required');
    }
    if (!pastaType.trim()) {
      errors.push('PastaType is required');
    }
    if (!dietryInfo.trim()) {
      errors.push('DietryInfo is required');
    }
    return errors;
  }
}
