import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Carrot', 2),
    new Ingredient('Cucumber', 3)
  ];


  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    /* for(let ingredient of ingredients){
      this.addIngredient(ingredient);
    } */ //emits too many events
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  getIngredient(index: number){
    return this.ingredients[index]
  }

  updateIngredient(ingredientIndex: number, newIngredient: Ingredient){
    this.ingredients[ingredientIndex] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }


  deleteIngredient(index: number){
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}
