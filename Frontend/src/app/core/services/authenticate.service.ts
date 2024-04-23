import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDataInterface } from '../../interfaces/Login';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  ActionLogin(body: LoginDataInterface): Observable<LoginDataInterface> {
    return this.http.post<LoginDataInterface>("",body)
      .pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error: ${error.status}, mensaje: ${error.message}`
        }

        return throwError(() => errorMessage)
      }));
  }
}
