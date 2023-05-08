import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown/dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,   
    ]
})
export class SharedModule {

}