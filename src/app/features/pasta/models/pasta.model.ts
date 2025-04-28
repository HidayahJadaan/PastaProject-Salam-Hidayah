
export interface PastaDish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  chefId?: number;
  pastaType: string;
  dietaryInfo: string;
  dietaryInfo2?: string;
  ingredientIds?: string[];
  souceColor?:string,
}
