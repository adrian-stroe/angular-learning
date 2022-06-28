import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{


  constructor(private dataService: DataStorageService){}


  onSaveData(){
    this.dataService.storeRecipes()
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe()
  }

}
