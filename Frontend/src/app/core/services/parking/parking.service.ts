import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { infoCities, infoParking } from "../../../interfaces/Paqueaderos";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ParkingServices {
    constructor(private http: HttpClient) {

    }

    public getCities(): Observable<Array<infoCities>> {
        return this.http.get<Array<infoCities>>(`${environment.apiReser}/ciudades`);
    }

    public getParking(): Observable<Array<infoParking>>  {
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/parqueaderos`);
    }

    public getParkingCity(city: string): Observable<Array<infoParking>> {
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/parqueaderos/{ciudad}?ciudad=${city}`);
    }
}