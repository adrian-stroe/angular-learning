import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub!: Subscription
  isAuthenticated: boolean = false

  constructor(private dataService: DataStorageService, private authService: AuthService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userSub = this.authService.userSubject.subscribe(user =>{
      this.isAuthenticated = !user ? false : true //could also use !!user
    })

  }

  onLogout(){
    this.authService.logOut()
  }

  onSaveData(){
    this.dataService.storeRecipes()
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe()
  }

}
