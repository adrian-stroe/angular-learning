import { RecipesService } from './../recipes.service';
import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
