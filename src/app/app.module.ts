import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Commenting all unused imports
/* import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';
import { RecipesDefaultComponent } from './recipes/recipes-default/recipes-default.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module'; 
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // Moved these declaration to shopping-list.module.ts
    /* ShoppingListComponent,
    ShoppingEditComponent, */

    // Moved these declarations to recipe.module.ts
    /* RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent, */

    // Moved these declarations to recipe.module.ts
    /* RecipesDefaultComponent,
    RecipeEditComponent, */

    // Moved this declartion to auth.module.ts
    // AuthComponent,

    // Moved these to shared.module.ts
    /* LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective */
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpClientModule,
    AppRouting,
    // ReactiveFormsModule,
    // Commenting the following recipes module because we are loading it lazily
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
    CoreModule,
    
  ],
  // The App would still work even if we dont provide ShoppingListService here.
  // But you have to provide @Injectable in "shopping-list.service.ts"
  // Moved the following providers to core.module.ts
  /* providers: [ShoppingListService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ], */
  bootstrap: [AppComponent]
})
export class AppModule { }
