import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // recipeSelected = new EventEmitter<Recipe>();
  // Do not need this as we are using Routes
  // recipeSelected = new Subject<Recipe>();


  private recipes: Recipe[] = [
    // Commented the following recipes as we are now loading recipes from Firebase 
    // (https://recipe-place-default-rtdb.firebaseio.com/recipes.json)
    /* new Recipe('Recipe One', 
    'Starter', 
    'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=826&t=st=1667540639~exp=1667541239~hmac=64065716ae38f1bcc8c7dc6a74eb935fe99c235b7d2c089dc9d815f9ba9683a9',
    [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]),
    new Recipe('Recipe Two', 
    'Entree', 
    'https://img.freepik.com/free-photo/grilled-chicken-breast-fresh-vegetable-salad-tomatoes-cucumbers-lettuce-leaves-chicken-salad-healthy-food-flat-lay-top-view_2829-4244.jpg?t=st=1667520987~exp=1667521587~hmac=0bdc0a393ccac635ebb7c9d40df21d8fe9c28b1e4d9811acd0b3b6e7dcc4e50b',
    [new Ingredient('Meat', 1), new Ingredient('Sauce', 2)]), */
  ]

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    // The slice() without arguments will retrun a copy of the array.
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); 
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) { 
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
