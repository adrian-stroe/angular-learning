import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a test', 'https://westdale.lavapizza.ca/wp-content/uploads/2017/01/single-pizza-pic.png'),
    new Recipe('Another test recipe', 'This is a test', 'https://westdale.lavapizza.ca/wp-content/uploads/2017/01/single-pizza-pic.png')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe)
  }

}
