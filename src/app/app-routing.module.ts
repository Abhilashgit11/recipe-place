import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

// Commenting all unused imports
/* import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesDefaultComponent } from "./recipes/recipes-default/recipes-default.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeResolverService } from "./recipes/services/recipe-resolver/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard"; */

const appRoutes: Routes = [
    // Here pathMatch means only redirect if the entire path is empty
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path: 'shoppinglist', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
    //Moved these paths to recipes.routing.module.ts
    /* {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],  children: [
        {path: '', component: RecipesDefaultComponent},
        {path: 'new', component: RecipeEditComponent}, 
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]}, */
    // Moved these paths to shopping-list-routing.module.ts
    // {path: 'shoppinglist', component: ShoppingListComponent},

    //Moved this to auth-routing.module.ts
    // {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRouting {
    
}