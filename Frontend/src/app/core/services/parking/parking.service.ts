import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { infoCities, infoParking, InfoGetFee } from "../../../interfaces/Parqueaderos";
import { environment } from "../../../../environments/environment";
import { AuthenticateService } from "../autheticate/authenticate.service";
import { InfoReserveUser, InfoSendReserve } from "../../../interfaces/Reserve";

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

    public getFees(tarifa: string): Observable<InfoGetFee> {
        return this.http.get<InfoGetFee>(`${environment.apiReser}/consulta/tarifas/${tarifa}`);
    }

    public getAllFees(): Observable<InfoGetFee[]> {
        return this.http.get<InfoGetFee[]>(`${environment.apiReser}/consulta/tarifas`)
    }

    public getReserves(doc: number, typeDoc: string): Observable<InfoReserveUser[]> {
        this.loadHead();
        return this.http.get<InfoReserveUser[]>(`${environment.apiReser}/reservas?doc=${doc}&tipoDoc=${typeDoc}`, { headers: this.header })
    }

    public addReserve(info: InfoSendReserve): Observable<any> {
        this.loadHead();
        return this.http.put<any>(`${environment.apiReser}/reservas/agregarReserva`, info, { headers: this.header });
    }

    public updateReserve(info: InfoSendReserve): Observable<any> {
        this.loadHead();
        return this.http.patch<any>(`${environment.apiReser}/reservas/actualizar`, info, { headers: this.header });
    }

    public deleteReserve(id: string): Observable<any> {
        this.loadHead();
        return this.http.delete<any>(`${environment.apiReser}/reservas/cancelar?id=${id}`, { headers: this.header })
    }
}