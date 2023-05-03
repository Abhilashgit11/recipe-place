import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.dataService.fetchRecipes().subscribe();
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

}
