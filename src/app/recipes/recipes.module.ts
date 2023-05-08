import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDefaultComponent } from "./recipes-default/recipes-default.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipesDefaultComponent,
        RecipeEditComponent,
    ],
    imports: [
        // Without this the app is working, in course it was not removed.
        // RouterModule, 
        // CommonModule, 
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    exports: [
        //These declarations need to be exported only if they are being used by other modules. 
        // In our project we are not using any of the recipes components in other modules. 
        // So if we comment these out the app would still work.
        // RecipesComponent,
        // RecipeListComponent,
        // RecipeDetailComponent,
        // RecipeItemComponent,
        // RecipesDefaultComponent,
        // RecipeEditComponent,
    ]
})
export class RecipesModule {

}