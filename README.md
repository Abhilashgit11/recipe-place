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
        1. reciape-detil
        2. recipe-list
            2.2.1 recipe-item
    3. shopping-list
        1. shopping-list-editor
Note: To generate component without the spec.ts file: ng g c component-name --spec false
5. Added content to header.component.html: Added html tags with bootstrap classes which displays "Title" and "Navigation Bar".
6. Added content to recipes.component.html and shopping-list.component.html: Added html tags with bootstrap classes which displays these components in  columns.
7. Created recipe.model.ts which has the structure of the recipe object.
8. Added two recipe objects in recipe-list.component.ts.
9. Populating the two recipe objects in a component using *ngFor.
10. 