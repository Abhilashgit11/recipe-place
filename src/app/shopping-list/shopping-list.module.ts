import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        // CommonModule, 
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule,
        // Since we have only one route, we can manage it here as well
        /* RouterModule.forChild([
            {path: 'shoppinglist', component: ShoppingListComponent}
        ]), */
        
    ],
    exports: []
})
export class ShoppingListModule {

}