import { Injectable } from "@angular/core";
import { PastaDish } from "../models/pasta.model";

@Injectable({ providedIn: 'root' })
export class PastaService {
  private dishes: PastaDish[] = [];

  getDishesByChef(chefId: number): PastaDish[] {
    return this.dishes.filter((d) => d.chefId === chefId);
  }

  addDish(dish: PastaDish) {
    dish.id = this.dishes.length + 1;
    this.dishes.push(dish);
  }

  updateDish(id: number, data: Partial<PastaDish>) {
    const index = this.dishes.findIndex((d) => d.id === id);
    if (index !== -1) this.dishes[index] = { ...this.dishes[index], ...data };
  }
}
