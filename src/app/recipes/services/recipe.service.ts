import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe One', 
    'Starter', 
    'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=826&t=st=1667540639~exp=1667541239~hmac=64065716ae38f1bcc8c7dc6a74eb935fe99c235b7d2c089dc9d815f9ba9683a9',
    [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]),
    new Recipe('Recipe Two', 
    'Entree', 
    'https://img.freepik.com/free-photo/grilled-chicken-breast-fresh-vegetable-salad-tomatoes-cucumbers-lettuce-leaves-chicken-salad-healthy-food-flat-lay-top-view_2829-4244.jpg?t=st=1667520987~exp=1667521587~hmac=0bdc0a393ccac635ebb7c9d40df21d8fe9c28b1e4d9811acd0b3b6e7dcc4e50b',
    [new Ingredient('Meat', 1), new Ingredient('Sauce', 2)])
  ]

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    // The slice() without arguments will retun a copy the array.
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }
}
