import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { NewsInterface } from "../../../interfaces/News";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class NewsService {

    constructor(private http: HttpClient) {
        
    }

    public getNews(): Observable<Array<NewsInterface>> {
        return this.http.get<Array<NewsInterface>>(`${environment.apiReser}/Anuncios`);
    }
}