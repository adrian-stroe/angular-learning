
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {


  private recipes: Recipe[]=[
    new Recipe('Diavolo Pizza',
     'Wide and tasty pizza',
     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpizza-piccolo.at%2Fshop%2Fmedia%2Fimages%2Fpopup%2Fdiavolo_pizza.jpg&f=1&nofb=1',
  [
    new Ingredient('Pepperoni', 15),
    new Ingredient('Flour', 2)
  ]),
    new Recipe('Ramen',
    'Thick and savoury noodles',
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fjapanalytic.com%2Fwp-content%2Fuploads%2F2016%2F07%2Framen-2.jpg&f=1&nofb=1',
    [
      new Ingredient('Noodles', 2),
      new Ingredient('Eggs', 2)
    ])
  ]


  constructor(private shoppingService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice() //return copy
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients)
  }

  getRecipe(index: number){
    return this.recipes.slice()[index]
  }


}
