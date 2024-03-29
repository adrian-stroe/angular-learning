import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form',{static: false}) shoppingListForm!: NgForm

  subscription!: Subscription
  editMode: boolean = false
  editedItemIndex!: number;
  editedItem!: Ingredient

  constructor(private shoppingService: ShoppingListService) { }


  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number )=>{
        this.editMode = true;
        this.editedItemIndex = index
        this.editedItem = this.shoppingService.getIngredient(index)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onAddItem(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingService.addIngredient(newIngredient)
    }
    this.editMode = false
    form.reset()
  }


  onDelete(){
    this.onClear()
    this.shoppingService.deleteIngredient(this.editedItemIndex)
  }

  onClear(){
    this.shoppingListForm.reset()
    this.editMode = false
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }

}
