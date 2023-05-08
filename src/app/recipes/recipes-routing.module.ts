import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDefaultComponent } from "./recipes-default/recipes-default.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolverService } from "./services/recipe-resolver/recipe-resolver.service";


const routes: Routes = [
    // {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],  children: [
    // Removed recipes from path because, we are using loadChildren in app-routing.module.ts
    // we will already be at /recipies
    {path: '', component: RecipesComponent, canActivate: [AuthGuard],  children: [
        {path: '', component: RecipesDefaultComponent},
        {path: 'new', component: RecipeEditComponent}, 
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}