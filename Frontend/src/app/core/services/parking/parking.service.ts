import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { infoCities, infoParking } from "../../../interfaces/Paqueaderos";
import { environment } from "../../../../environments/environment";
import { InfoCard, InfoCardSend, InfoChangeUser, InfoDeleteCard, InfoSendPassword, InfoUser } from "../../../interfaces/User";
import { AuthenticateService } from "../autheticate/authenticate.service";

@Injectable({
    providedIn: 'root'
})
export class ParkingServices {

    public header!: HttpHeaders;

    constructor(private http: HttpClient, private authenticaService: AuthenticateService) {
        this.loadHead()   
    }

    public loadHead() {
        this.header = new HttpHeaders ({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authenticaService.getCookieToken()}`
        })
    }

    public getCities(): Observable<Array<infoCities>> {
        return this.http.get<Array<infoCities>>(`${environment.apiReser}/consulta/ciudades`);
    }

    public getParking(): Observable<Array<infoParking>> {
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/consulta/parqueaderosCiudad`);
    }

    public getParkingCity(city: string): Observable<Array<infoParking>> {
        return this.http.get<Array<infoParking>>(`${environment.apiReser}/consulta/parqueaderos/${city}`);
    }
}