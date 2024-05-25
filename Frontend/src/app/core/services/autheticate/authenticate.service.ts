import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDataInterface, LoginResponse } from '../../../interfaces/Login';
import { SigninDataInterface, SigninResponse } from '../../../interfaces/Signin';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private cookieService: CookieService, private root: Router) { 

  }

  public cookieSession(user: string, type: string) {
    const HA = new Date();
    const expireDate = new Date(HA.getTime() + 60 * 60 * 1000);
    let name = '';
    if(type == 'C') {name = 'customer'; this.root.navigate(['/userInterface'])}
    else if (type == 'G') {name = 'manager'; this.root.navigate(['/registeredParking'])}
    else if (type == 'A') {name = 'admin'; this.root.navigate(['/generateStatistics'])}
        
    this.cookieService.set(name, user, { expires: expireDate, secure: true, sameSite: 'None'})
  }

  public cookieToken(token: string) {
    this.cookieService.set('_token', token);
  }

  public  getCookieSessionCustomer(): string {
    return this.cookieService.get('customer')
  }

  public  getCookieSessionManager(): string {
    return this.cookieService.get('manager')
  }

  public  getCookieSessionAdmin(): string {
    return this.cookieService.get('admin')
  }

  public getCookieToken(): string {
    return this.cookieService.get('_token');
  }

  public isCustomer(): boolean {
    return this.cookieService.check('customer');
  }

  public isManager(): boolean {
    return this.cookieService.check('manager');
  }

  public isAdmin(): boolean {
    return this.cookieService.check('admin');
  }

  public isToken(): boolean {
    return this.cookieService.check('_token')
  }

  public clearCookies() {
    this.cookieService.deleteAll();
  }

  public ActionLogin(body: LoginDataInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiAuthen}/login`,body);
  }

  public ActionSignin(body: SigninDataInterface): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${environment.apiAuthen}/registrar`,body);
  }
}
