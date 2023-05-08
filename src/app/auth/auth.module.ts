import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [AuthComponent],
    imports: [
        // 
        /* RouterModule.forChild([
            {path: 'auth', component: AuthComponent}
        ]) */
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        SharedModule
    ]
})
export class AuthModule {

}