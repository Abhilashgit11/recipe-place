import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

// Both the @Injectabel are working but the course suggested @Injectable() only
// @Injectable({providedIn: 'root'})
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    // Both are working: not sure which one to use.
    // intercept(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            });
            return next.handle(modifiedReq);
        }));
    }
}