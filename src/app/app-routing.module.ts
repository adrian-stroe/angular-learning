import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: ()=>{return import('./recipes/recipes.module').then(module =>module.RecipesModule)}},
  {path: 'shopping-list', loadChildren: ()=>{return import('./shopping-list/shopping-list.module').then(module =>module.ShoppingListModule)}},
  {path: 'auth', loadChildren: ()=>{return import('./auth/auth.module').then(module =>module.AuthModule)}}

]


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
