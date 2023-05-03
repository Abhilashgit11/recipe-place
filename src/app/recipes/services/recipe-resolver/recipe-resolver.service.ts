import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../../recipe-list/recipe.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { RecipeService } from "../recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {
    }

    // We are not subscribing here as the resolve() method will subscribe for us.
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}