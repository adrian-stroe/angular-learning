import { Recipe } from './../recipes/recipe.model';
import { RecipesService } from './../recipes/recipes.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{


  constructor(private http: HttpClient, private recipesService: RecipesService){}

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://ng-course-recipe-292d5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
    .subscribe(
      res => {
      console.log(res)
    })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-292d5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(
      map((recipes)=>{
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }),
      tap(recipes =>{
        this.recipesService.setRecipes(recipes)
      })
    )
  }

}
