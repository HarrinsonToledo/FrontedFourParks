import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDataInterface, LoginResponse } from '../../../interfaces/Login';
import { error } from 'node:console';
import { SigninDataInterface, SigninResponse } from '../../../interfaces/Signin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  public ActionLogin(body: LoginDataInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://four-parks-be142f13c4de.herokuapp.com/login",body);
  }

  public ActionSignin(body: SigninDataInterface): Observable<SigninResponse> {
    return this.http.post<SigninResponse>("https://four-parks-be142f13c4de.herokuapp.com/login",body);
  }
}
