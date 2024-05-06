import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDataInterface, LoginResponse } from '../../../interfaces/Login';
import { SigninDataInterface, SigninResponse } from '../../../interfaces/Signin';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public cookieSession(user: string, password: string) {
    let value = user + '|' + password;

    const HA = new Date();
    const expireDate = new Date(HA.getTime() + 60 * 60 * 1000);
        
    this.cookieService.set('session', value, { expires: expireDate, secure: true, sameSite: 'None'})
  }

  public ActionLogin(body: LoginDataInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiAuthen}/login`,body);
  }

  public ActionSignin(body: SigninDataInterface): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${environment.apiAuthen}/registrar`,body);
  }
}
