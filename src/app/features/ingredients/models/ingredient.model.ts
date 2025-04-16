export interface Ingredient {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  linkedDishId?: number;
}
