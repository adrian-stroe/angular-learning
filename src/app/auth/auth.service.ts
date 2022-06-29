import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs'

export interface AuthResData{
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean //? = optional
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null!);//behavior subject gives subscribers immediate access to the prev value if they havent subscribed when the value was emitted
  private tokenExpTimer: any

  constructor(private http: HttpClient, private router: Router){}

  logOut(){
    this.userSubject.next(null!)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer)
    }
    this.tokenExpTimer = null
  }


  autoLogout(expirationDuration: number){
    this.tokenExpTimer = setTimeout(()=>{
      this.logOut()
    }, expirationDuration)
  }


  signUp(email: string, password: string){
    return this.http.post<AuthResData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZJBNjb9i4s7cbQJgvgjUE7nGIQT75drU',{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
    tap(resData =>{
     this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    })
    )
  }


  login(email: string, password: string){
    return this.http.post<AuthResData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZJBNjb9i4s7cbQJgvgjUE7nGIQT75drU',{
      email: email,
      password: password,
      returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData =>{
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }
      )
    )
  }


  autoLogin(){
    const userData: {email: string, id: string, _token: string, _tokenExpDate: string} = JSON.parse(localStorage.getItem('userData')!)
    if(!userData){
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate))
    if(loadedUser.token){
      this.userSubject.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime( )
      this.autoLogout(expirationDuration)
    }

  }


  private handleAuth(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000) //set expiration date
    const newUser = new User(email, userId, token, expirationDate)
    this.userSubject.next(newUser)
    this.autoLogout(expiresIn*1000)

    localStorage.setItem('userData', JSON.stringify(newUser))
  }


  private handleError(errorRes: HttpErrorResponse){
        let errMsg = 'An unknown error occurred'
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errMsg)
        }
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errMsg = 'This email already exists'
            break;
          case 'EMAIL_NOT_FOUND':
            errMsg = 'This email does not exist'
            break;
          case 'INVALID_PASSWORD':
            errMsg = 'Password is incorrect'
        }
        return throwError(errMsg)
      }


}
