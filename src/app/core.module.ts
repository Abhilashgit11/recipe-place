import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/services/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";


// You must use core module if you have provided your services in providers array.
// But if you have provided @Injectable({providedIn: 'root'}) on top your service 
// creating a core module is not recommended.
@NgModule({
    providers: [
        ShoppingListService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
      ],
})
export class CoreModule {

} 