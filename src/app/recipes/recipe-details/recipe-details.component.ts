import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addToSl(): void {
    this.recipeService.addToShoppingList(this.recipe.ingredient);
  }

  onDelete(): void{
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
