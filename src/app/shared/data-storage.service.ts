import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/services/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-place-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log('Response: ', response);
            });
    }

    fetchRecipes() {
        // this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json')
        return this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
                })
            }), tap(recipes => {
                console.log('Recipes: ', recipes);
                this.recipeService.setRecipes(recipes);
            }));
            // We are using tap, so we commented out the following subscribing
            /* .subscribe(recipes => {
                console.log('Recipes: ', recipes);
                this.recipeService.setRecipes(recipes);
            }); */
    }
}