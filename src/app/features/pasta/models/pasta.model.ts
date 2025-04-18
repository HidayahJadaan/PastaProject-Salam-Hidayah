
export interface PastaDish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  chefId?: number;
  pastaType: string;
  dietaryInfo: string;
  ingredientIds?: string[];
}
