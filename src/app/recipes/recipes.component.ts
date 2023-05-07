import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './services/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe !: Recipe;
  
  constructor(private recipeService: RecipeService,
              private dataService: DataStorageService) { }

  ngOnInit() {
    // Do not need this as we are using Routes
    /* this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    ); */
    this.dataService.fetchRecipes().subscribe();

  }

}
