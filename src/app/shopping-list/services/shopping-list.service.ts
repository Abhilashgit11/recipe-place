import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

// You can either add the following @Injectable on this service or 
// provide "ShoppingListService" in app.module.ts under "providers"
// @Injectable({
//   providedIn: 'root'
// })
export class ShoppingListService {

  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push({name: ingredient.name, amount: ingredient.amount});
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    /* for(let ingredient of ingredients) {
      this.addIngredient(ingredient);
    } */
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
