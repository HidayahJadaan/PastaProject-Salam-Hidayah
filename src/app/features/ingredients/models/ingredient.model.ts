export interface Ingredient {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  linkedDishIds?: string[];
}
