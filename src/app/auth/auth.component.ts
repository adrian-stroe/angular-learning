import { Router } from '@angular/router';
import { AuthService, AuthResData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{

  loginMode: boolean = true
  isLoading: boolean = false //for loading spinner
  errorMessage: string = ''

  constructor(private authService: AuthService, private router: Router){}

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
      console.log(resData)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errMsg=>{
      this.errorMessage = errMsg
      this.isLoading = false
    })

    formObj.reset()
  }

  onHandleError(){
    this.errorMessage = null!
  }

}
