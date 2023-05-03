# RecipePlace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---------------------------------------------- Angular project --------------------------------------------
---------------------------------------------- Recipe place ------------------------------------------------
1. Created the project with "ng new recipe-place".
2. Installed bootstrap with "npm i --save bootstrap" ("--save" adds bootstrap to dependencies section in package.json)
3. Added "bootstrap.min.css" path under styles in angular.json.
4. Created components (with ng g c component-name)
    1. header
    2. recipes
        1. recipe-detail
        2. recipe-list
            1. recipe-item
    3. shopping-list
        1. shopping-list-editor
Note: To generate component without the spec.ts file: ng g c component-name --spec false
5. Added content to header.component.html: Added html tags with bootstrap classes which displays "Title" and "Navigation Bar".
6. Added content to recipes.component.html and shopping-list.component.html: Added html tags with bootstrap classes which displays these components in  columns.
7. Created recipe.model.ts which has the structure of the recipe object.
8. Added two recipe objects in recipe-list.component.ts.
9. Populating the two recipe objects in a component using *ngFor.
--------------- 6. Course Project ------------------------------
10. Implementing navigation between "Recipes" and "shopping-list"
Added click events to both "Recipes" and "shopping-list" in header.component.html
Sending data from header.component.html to app.component.html through  @Output() featureSelected.
By using *ngIf, navigating between "Recipes" and "shopping-list" if the value of featureSelected is 'recipe' or not 'recipe'.
11. Passing Recipe data with property binding and event binding. i.e passing data from 
    1. recipe-item component to recipe-list component and from 
    2. recipe-list component to recipes component and there by displaying recipe-detail component.(recipe-detail tag (child component) is used in recipes component (parent component))

12. Allowing the user to add ingredients.
    With the help of @ViewChild() and @Output() we are passing data from shopping-edit component to shopping-list component and thereby adding an item to the list.
13. (8. Course Project) Created a directive "dropdown" in "shared" folder.
14. (10. Course Project) Created a two services 
    1. recipe service(inside recipes folder)
    2. shopping-list service (inside shopping-list folder)
    3. Instead of using @Output and emitting events, now we are using services for cross component communication.
    4. Moved recipe[] from "recipies.component.ts" to "recipe.service.ts" and created a method in "recipe.service.ts" to return the recipe[].
    5. Created an event which emits "Recipe" in "recipe.service.ts".
        eg.  recipeSelected = new EventEmitter<Recipe>();
    6. Catching the event "recipeSelected" in "recipe.component.ts"
        eg. this.recipeService.recipeSelected.subscribe(
                (recipe: Recipe) => {
                    this.selectedRecipe = recipe;
                }
            );
15. Adding ingredients from "recipe-detail.component.ts" to "shopping-list.component.ts" by using
    1. both recipe.service.ts and shopping-list.service.ts or 
    2. just shopping-list.service.ts

16. Routing & Observables
    1. Created a file "app-routing.module.ts" and added routes
    2. Added <router-outlet> whever necessary(in app.component.html, recipes.component.html)
    3. There are a lot of changes made when working on these two topics. 
    4. Most of the code was commented as we are using routes.
    5. Mainly we were working on Recipes components and its child components (Refer them for better understanding)

17. Forms (Taking TD approach) (For shopping-list component)
    1. Adding method: onSubmit() to form
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
    2. Binding the form and adding validations with "ngModel" "required"
        <input type="text" id="name" class="form-control" name="name" ngModel required>
    3. Making the items in the shopping list clickable
        1. Adding a method ((click)="onEditItem(i)) to the items in the shopping list (shopping-list.component.html)
            <a class="list-group-item" style="cursor:pointer" 
                *ngFor = "let ingredient of ingredients let i = index" 
                (click)="onEditItem(i)">
                {{ingredient.name}} {{ingredient.amount}}
            </a>
        2. In shopping-list.component.ts and under method onEditItem(i) we are emitting the index of the item
            onEditItem(index: number) {
            this.shoppingListService.startedEditing.next(index);
            }
        3. We need to catch this emitted index in "shopping-edit.component.ts" and we are doing that in ngOnInit().
            ngOnInit(){
                this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                })
            };
        4. Make sure to clear the subscription:
            ngOnDestroy() {
                this.subscription.unsubscribe();
            }
        5. Loading the selected shopping list item into the form and we are doing that in ngOnInit().
            ngOnInit(){
                this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.shoppingListForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
                });
            }
    4. Updating existing items
            1. Created updateIngredient() method in shopping-list.service.ts
            2. We are calling this method in shopping-edit.component.ts when we submit the form. 
            2. onSubmit() we are checking if an item is selected and if it is selected we are updating the item or else we are adding the item
                if (this.editMode) {
                    this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
                } else {
                    this.shoppingListService.addIngredient(newIngredient);
                }
    5. Resetting the form after adding the item or updating the item
            onSubmit (form: NgForm) {
                this.editMode = false;
                form.reset();
            }
    6. Resetting the form on click of "Clear" button
            onClear() {
                this.shoppingListForm.reset();
                this.editMode = false;
            }
    7. Deleting the shopping list item
            onDelete() {
                this.shoppingListService.deleteIngredient(this.editedItemIndex);
                this.onClear();
            }
18. Forms (Taking Reactive approach) (for Recipes component) 
    1. Created a Template form in "recipe-edit.component.html"
    2. Created Reactive Form in recipe-edit.component.ts
        recipeForm!: FormGroup;
        and created a method
        private initForm() {
            let recipeName = '';
            let recipeImagePath = '';
            let recipeDescription = '';

            if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.desc;
            }

            this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName),
            'imagePath': new FormControl(recipeImagePath),
            'description': new FormControl(recipeDescription)
            });
        }
    3. Now we have to bind the template in "recipe-edit.component.html" and reactive form in "recipe-edit.component.ts"
        <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
        <input type="text" id="name" class="form-control" formControlName="name">
        <textarea type="text" id="description" class="form-control" rows="6" formControlName="description">
    4. Adding ingredient controls to FormArray
        Refer to recipe-edit.component.ts
        let recipeIngredients = new FormArray<FormGroup>([]);

        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
    5. Add Ingredient dynamically (on click)
        1. Created a buttonin recipe-edit.component.html
            <button type="button" class="btn btn-success" (click)="onAddIngredient()">Add Ingredient</button>
        2. Implemented onAddIngredient() method in recipe-edit.component.ts
            onAddIngredient() {
                (this.recipeForm.get('ingredients') as FormArray).push(
                    new FormGroup({
                        'name': new FormControl(null, Validators.required),
                        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                    })
                );
            }
    6. Adding validations to all the FormControls.
    7. Submitting the Form
        1. Created two methods in recipe.service.ts: addRecipe() and updateRecipe()
        2. When we click on save in recipe-edit.component.html, onSubmit() method is called.
        3. In onSubmit() method we check if the form is in editMode, if it is in editMode updateRecipe() is called or else addRecipe() is called.
    8. Adding cancel functionality
        1.  Linked button click listener
            <button type="button" class="btn btn-danger" (click)="onCancel()">Cancel</button>
        2. onCancel() we are navigating away to the recipe-edit component
            onCancel() {
                this.router.navigate(['../'], {relativeTo: this.route});
            }
    9. Adding Delete funnctionality
        OnDeleteRecipe() {
            this.recipeService.deleteRecipe(this.id);
            // If dont add the following router to navigate to "/recipes" 
            // the deleted recipe will still show in the recipe-detals component 
            this.router.navigate(['/recipes']);
        }
    10. At this point we are unable to see Image preview in recipe-edit component
        Adding Image preview
        1. Creating a local reference: imagePath
            <input type="text" id="imagePath" class="form-control" formControlName="imagePath" #imagePath>
        2. And now binding the image source with local reference value
            <img [src]="imagePath.value" alt="Image" class="img-responsive">
    11. (16.21) This is a bug.
        There are three ways to provide a service.
        1. Adding @Injectable decorator (e.g. recipe.service.ts)
        2. Providing in app.module.ts under Providers: [] (e.g. app.module.ts)
        3. Providing directly under a component. (e.g. recipes.component.ts)
            This way when the component is destroyed the instance of the service is also destroyed.
            For demonstration:
            1. When you create a recipe and navigate to shopping list and come back to recipe we wont see the added recipe.
            2. This might be something we need. But for this recipe project we need to avoid this.
            3. This can be avoided by using @Injectable decorator on service or adding your service to Providers in app.module.ts
19. Http
    1. Setting a backend in firebase
    2. Created a new service to make http requests. (You can also perform the same http requests in recipe.service.ts)
    3. Made a put request
    4. Made a get request
    5. If the newly added recipe has no ingredients we must add in an empty ingredient to the recipe. It is considered good practice. This we achieve: When we are getting the recipes we add empty ingredient to the recipe via pipe() operator (in data-storage.service.ts).
    6. Adding resolve to fetch data before hand. (Need to practice more on "resolve")
20. 


