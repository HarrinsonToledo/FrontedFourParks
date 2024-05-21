import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { InfoCard, InfoCardSend, InfoChangeUser, InfoDeleteCard, InfoSendPassword, InfoUser } from "../../../interfaces/User";
import { AuthenticateService } from "../autheticate/authenticate.service";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

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

    public getDataUser(user: string): Observable<InfoUser> {
        this.loadHead();
        return this.http.get<InfoUser>(`${environment.apiReser}/usuarios/misdatos/${user}`, {headers: this.header});
    }

    public getCards(nDoc: number, tDoc: string): Observable<Array<InfoCard>> {
        this.loadHead();
        return this.http.get<Array<InfoCard>>(`${environment.apiReser}/usuarios/tarjetas?numDoc=${nDoc}&tipoDoc=${tDoc}` , {headers: this.header})
    }

    public updateUser(info: InfoChangeUser): Observable<string> {
        this.loadHead();
        return this.http.patch<string>(`${environment.apiReser}/usuarios/actualizar`,info,{headers: this.header});
    }

    public addCard(info: InfoCardSend): Observable<string> {
        this.loadHead();
        return this.http.post<string>(`${environment.apiReser}/usuarios/tarjetas/agregar`,info, {headers: this.header});
    }

    public updatePassword(info: InfoSendPassword): Observable<string> {
        this.loadHead();
        return this.http.patch<string>(`${environment.apiAuthen}/actualizarContra`, info, {headers: this.header});
    }

    public deleteCard(info: InfoDeleteCard): Observable<string> {
        this.loadHead();
        return this.http.delete<string>(`${environment.apiReser}/usuarios/tarjetas/eliminar`, {headers: this.header, body: info});
    } 
}