import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Carrot', 2),
    new Ingredient('Cucumber', 3)
  ];


  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    /* for(let ingredient of ingredients){
      this.addIngredient(ingredient);
    } */ //emits too many events
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

}
