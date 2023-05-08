import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    kind: string
    idToken: string;
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {
    // userSubject = new Subject<User>();
    // (20.16) Adding token to outgoing requests
    // On demand fecthing of the user data
    userSubject = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient, 
                private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
         {
            email: email,
            password: password,
            returnSecureToken: true
         }).pipe(catchError(this.handleError), 
         // For storing user data
         tap(resData => {
            // Moved the following code to "handleAuthentication" method
            // new Date().getTime(): This returns time in milliseconds
            // resData.expiresIn returns a number of seconds enclosed in a string(e.g. '20')
            // When we add '+' in front of +resData.expiresIn it converts '20' to 20
            // Then we are performing operation 20 * 1000 to convert 
            // resData.expiresIn value which is in seconds to milliseconds
            // This whole thing(new Date().getTime() + +resData.expiresIn * 1000) 
            // is enclosed in a new Date() to convert date which is in milliseconds to a date object. 
            /* const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
            this.userSub.next(user); */
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
         }));
         // We repeated the following code twice. We should avoid this.
         // So we created a new method "handleError"
         /* .pipe(catchError(errorRes => {
            return throwError(() => errorRes.error.error.message);
         })); */
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
        tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
         })
        );
        // We repeated the following code twice. We should avoid this.
        // So we created a new method "handleError"
        /* .pipe(catchError(errorRes => {
            return throwError(() => errorRes.error.error.message);
         })); */
    }

    autoLogin() {
        // The userData in localStorage is saved as JSON string
        // We need to convert that to an object
        const userData: { 
            email: string, 
            id: string, 
            _token: string, 
            _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.userSubject.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
                                        new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        // To clear all data from localStorage
        // localStorage.clear();
        // To clear a particular data from localStorage
        localStorage.removeItem('userData');
        // Without the following code we are still able to logout after certain seconds
        /* if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null; */
    }

    autoLogout(expirationDuration: number) {
        // Without the following code we are still able to logout after certain seconds
        // this.tokenExpirationTimer = setTimeout(() => {
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        return throwError(() => errorRes.error.error.message);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000);
        // Here the user object is stored in localStorage and is stored as JSON string
        localStorage.setItem('userData', JSON.stringify(user));
    }
}