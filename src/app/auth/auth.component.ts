import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

  loginMode: boolean = true
  isLoading: boolean = false //for loading spinner
  errorMessage: string = ''
  @ViewChild(PlaceholderDirective, {static:false}) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription


  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode(){
    this.loginMode = !this.loginMode
  }


  onSubmit(formObj: NgForm){
    if(!formObj.valid){
      return
    }
    const email = formObj.value.email
    const password = formObj.value.password

    let authObs: Observable<AuthResData>

    this.isLoading = true

    if(this.loginMode){
      authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signUp(email,password)
    }

    authObs.subscribe(resData =>{
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errMsg=>{
     /*  this.errorMessage = errMsg */
      this.showErrorAlert(errMsg)
      this.isLoading = false
    })

    formObj.reset()
  }




  private showErrorAlert(msg: string){
   const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
   const hostViewContainerRef = this.alertHost.viewContainerRef
   hostViewContainerRef.clear()
   const componentRef = hostViewContainerRef.createComponent(alertCompFactory)
   componentRef.instance.message = msg
   this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe()
    hostViewContainerRef.clear()
   })
  }

  onHandleError(){
    this.errorMessage = null!
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.closeSub){
      this.closeSub.unsubscribe( )
    }
  }

}
