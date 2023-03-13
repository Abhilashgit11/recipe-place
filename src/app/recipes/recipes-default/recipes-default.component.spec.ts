import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDefaultComponent } from './recipes-default.component';

describe('RecipesDefaultComponent', () => {
  let component: RecipesDefaultComponent;
  let fixture: ComponentFixture<RecipesDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
