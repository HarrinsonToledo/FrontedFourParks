import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InfoEditPark, infoParking, ResponseEditPark } from "../../../interfaces/Parqueaderos";
import { environment } from "../../../../environments/environment";
import { AuthenticateService } from "../autheticate/authenticate.service";
import { InfoReportPark,  InfoReportCity } from "../../../interfaces/Reports";

@Injectable({
    providedIn: 'root'
})
export class ManagerServices {

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

    public editParks(info: InfoEditPark[]): Observable<ResponseEditPark> {
        this.loadHead();
        return this.http.patch<ResponseEditPark>(`${environment.apiParame}/parqueadero/actualizarParqueaderos`, info, { headers: this.header });
    }

    public adminPark(info: infoParking): Observable<ResponseEditPark> {
        this.loadHead();
        return this.http.patch<ResponseEditPark>(`${environment.apiParame}/parqueadero/administrarParqueadero`, info, { headers: this.header });
    }

    public getCalcCity(manager: string): Observable< InfoReportCity[]> {
        this.loadHead();
        return this.http.get< InfoReportCity[]>(`${environment.apiParame}/reportes/reporteParqueaderos/${manager}`, { headers: this.header})
    }

    public getCalcPark(park: string): Observable<InfoReportPark[]> {
        this.loadHead();
        return this.http.get<InfoReportPark[]>(`${environment.apiParame}/reportes/reporteParqueadero/${park}`, { headers: this.header})
    }
}