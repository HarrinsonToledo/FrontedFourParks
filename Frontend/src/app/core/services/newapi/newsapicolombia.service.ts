import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NewsInterface } from '../../../interfaces/News';

@Injectable({
  providedIn: 'root'
})
export class NewsapicolombiaService {

  constructor(private http: HttpClient) { }

  public getInfoNews(): Observable<NewsInterface> {
    return this.http.get<NewsInterface>("https://newsapi.org/v2/top-headlines?country=co&apiKey=a2f56d1300ce49b8a55b90bc141e47fa");
  }
}
