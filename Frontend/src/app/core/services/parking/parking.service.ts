import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { infoCities, infoParking } from "../../../interfaces/Paqueaderos";
import { environment } from "../../../../environments/environment";
import { InfoCard, InfoUser } from "../../../interfaces/User";

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
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/parqueaderosCiudad`);
    }

    public getParkingCity(city: string): Observable<Array<infoParking>> {
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/parqueaderos/${city}`);
    }

    public getDataUser(user: string): Observable<InfoUser> {
        return this.http.get<InfoUser>(`${environment.apiReser}/usuarios/misdatos/${user}`);
    }

    public getCards(nDoc: number, tDoc: string): Observable<Array<InfoCard>> {
        return this.http.get<Array<InfoCard>>(`${environment.apiReser}/usuarios/tarjetas?numDoc=${nDoc}&tipoDoc=${tDoc}`)
    }
}