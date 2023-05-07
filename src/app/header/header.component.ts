import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  // @Output() featureSelected = new EventEmitter<string>();

  // For logout functionality
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(private dataService: DataStorageService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      // The above statement can also be witten as
      this.isAuthenticated = !!user;
      console.log('!user: ', !user); // false
      console.log('!!user: ', !!user); // true
    });
  }

  // Commented becoz now we are using Routes
  /* onSelect(feature: string) {
    this.featureSelected.emit(feature);
  } */

  onSaveRecipe() {
    this.dataService.storeRecipes();
  }

  onFetchRecipe() {
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
