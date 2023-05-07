import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log('Form Value: ', form.value);
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs!: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      // We are using the follwing code twice. We should avoid this
      authObs = this.authService.login(email, password);
      /* .subscribe({
        next: resData => {
        console.log(`After Signup Response Data: `, resData);
        this.isLoading = false;

      }, error: error => {
        console.log(`After Signup error: `, error);
        // We can handle the error here 
        // but it is good practice to handle the errors in the service (auth.service.ts)
        this.error = error;
        this.isLoading = false;
      }
    }); */
    } else {
      // We are using the follwing code twice. We should avoid this

      authObs = this.authService.signup(email, password);
      /* .subscribe({
        next: resData => {
        console.log(`After Signup Response Data: `, resData);
        this.isLoading = false;

      }, error: error => {
        console.log(`After Signup error: `, error);
        // We can handle the error here 
        // but it is good practice to handle the errors in the service (auth.service.ts)
        this.error = error;
        this.isLoading = false;
      }
    }); */
    }

    authObs.subscribe({
      next: resData => {
      console.log(`After Signup Response Data: `, resData);
      this.isLoading = false;
      this.error = '';
      // We can navigate to '/recipes' in auth.service.ts as well, 
      // but to keep routing separate from service we are doing it in component.
      this.router.navigate(['/recipes'])
    }, error: error => {
      console.log(`After Signup error: `, error);
      // We can handle the error here 
      // but it is good practice to handle the errors in the service (auth.service.ts)
      this.error = error;
      this.isLoading = false;
    }
  });

    form.reset();
  }

  onHandleError() {
     this.error = null;
  }

}
