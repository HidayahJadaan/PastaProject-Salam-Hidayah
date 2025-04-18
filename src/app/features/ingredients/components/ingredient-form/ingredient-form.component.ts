import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from '../../services/ingredients.service';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss',
})
export class IngredientFormComponent {

  constructor(private ingredientsService:IngredientsService){}
  ingredientId: string | null = null;
  name: string = '';
  description: string = '';
  quantity: number = 1;
  unit: string = '';
  loading: boolean = false;
  errors: string[] = [];
  success: string = '';
  loadingforGet: boolean = false;






  
  saveIngredient(): void {
 this.loading = false;
 this.errors.length = 0; //reset data
 if (this.name.trim() && this.description.trim()) {
   //send data
   const ingredient: Ingredient = {
     id: '' + Math.random(),
     name: this.name,
     description: this.description,
     quantity: this.quantity,
     unit: this.unit,
   
   };
   this.loading = true;
 
     this.ingredientsService.addIngredient(ingredient)
     .then((ing: Ingredient) => {
       (this.loading = false),
        (this.success = 'Ingredient added successfully');
     });

   
 } else {
   this.errors.push(
     ...this.ingredientsService.validateIngredientForm(
       this.name,
       this.description,
       this.quantity,
       this.unit,
       
     )
   );
 }




  }
}
