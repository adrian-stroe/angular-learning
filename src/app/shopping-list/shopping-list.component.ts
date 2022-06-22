import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Carrot', 2),
    new Ingredient('Cucumber', 3)
  ];


  constructor() {

  }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient){
    if (ingredient.name != ''  && ingredient.amount > 0 ){
      this.ingredients.push(ingredient)
    }
  }


}
