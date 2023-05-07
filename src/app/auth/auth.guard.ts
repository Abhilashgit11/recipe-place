import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.userSubject.pipe(take(1), map(user => {
            // Not sure why in the course it was stored this way
            const isAuth = !!user;
            // if(isAuth) {
            // I'm checking user directly
            if(user) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}