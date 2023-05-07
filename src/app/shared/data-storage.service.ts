import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/services/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-place-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log('Response: ', response);
            });
    }

    fetchRecipes() {
        // The following code subscribes to the userSubject in auth.service.ts and unsubscribes it
        // after taking just one value.
        // Moved the following code to auth-interceptor.service.ts
        /* return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
            if(user !== null && user.token !== null) {
                return this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json', {  
                params: new HttpParams().set('auth', user.token)
            });
            } else {
                return this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json', {  
                params: new HttpParams()
            })
            } 
        }),  */

        // Replaced the above code with 
        return this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []};
                });
            }), tap(recipes => {
                console.log('Recipes: ', recipes);
                this.recipeService.setRecipes(recipes);
            })
        );
        // this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json')
        // The following code is moved to exhaustMap above
        /* return this.http.get<Recipe[]>('https://recipe-place-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
                })
            }), tap(recipes => {
                console.log('Recipes: ', recipes);
                this.recipeService.setRecipes(recipes);
            })); */
            // We are using tap, so we commented out the following subscribing
            /* .subscribe(recipes => {
                console.log('Recipes: ', recipes);
                this.recipeService.setRecipes(recipes);
            }); */
    }
}