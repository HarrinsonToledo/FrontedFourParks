import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDataInterface, LoginResponse } from '../../../interfaces/Login';
import { SigninDataInterface, SigninResponse } from '../../../interfaces/Signin';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  public ActionLogin(body: LoginDataInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://four-parks-be142f13c4de.herokuapp.com/login",body);
  }

  public ActionSignin(body: SigninDataInterface): Observable<SigninResponse> {
    return this.http.post<SigninResponse>("https://four-parks-be142f13c4de.herokuapp.com/registrar",body);
  }
}
