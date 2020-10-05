import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://ng-app-4f15f.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(): any {
   return this.http.get<Recipe[]>('https://ng-app-4f15f.firebaseio.com/recipes.json').pipe(map(recipes => {
      return recipes.map(recipe => {
        return {... recipe, ingredient: recipe.ingredient ? recipe.ingredient : []};
      });
    }), tap(recipes => {
      this.recipesService.setRecipes(recipes);
      }));
  }
}

