import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Recipe One', 'Starter', 'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=826&t=st=1667540639~exp=1667541239~hmac=64065716ae38f1bcc8c7dc6a74eb935fe99c235b7d2c089dc9d815f9ba9683a9'),
    new Recipe('Recipe Two', 'Entree', 'https://img.freepik.com/free-photo/grilled-chicken-breast-fresh-vegetable-salad-tomatoes-cucumbers-lettuce-leaves-chicken-salad-healthy-food-flat-lay-top-view_2829-4244.jpg?t=st=1667520987~exp=1667521587~hmac=0bdc0a393ccac635ebb7c9d40df21d8fe9c28b1e4d9811acd0b3b6e7dcc4e50b')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
