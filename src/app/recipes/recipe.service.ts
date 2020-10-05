import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'Very Good',
  //     'Super-tasty Schnitzel',
  // tslint:disable-next-line:max-line-length
  //     'https://www.thespruceeats.com/thmb/LeyN-7W9T0KB2nl6pcuDZckHnjc=/4288x2848/filters:fill(auto,1)/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20),
  //       new Ingredient('Lettuce', 10),
  //       new Ingredient('Lemon', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'Nice',
  //     'Yum Yum Burger',
  //     'https://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger-scaled.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Cheese', 1),
  //       new Ingredient('Bacon', 1),
  //       new Ingredient('Lettuce', 2),
  //       new Ingredient('Tomato', 2),
  //       new Ingredient('Pickles', 3),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number): any {
    return this.recipes[index];
  }

  getRecipes(): any {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number): void {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
