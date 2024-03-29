import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangedSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService, 
              private loggingService: LoggingService) { }
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSub = this.shoppingListService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   // this.ingredients.push({name: ingredient.name, amount: ingredient.amount});
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy(){
    this.igChangedSub.unsubscribe();
    this.loggingService.printLog('Hello from Shopping List ngOnInit');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
