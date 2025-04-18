import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsService } from './services/ingredients.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import { IngredientssRoutingModule } from './ingredients-routing.module';



@NgModule({
  declarations: [
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IngredientssRoutingModule
  ],
  providers:[{provide:IngredientsService, useClass:IngredientsService}]
})
export class IngredientsModule { }
