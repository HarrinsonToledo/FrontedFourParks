import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthenticateService } from "../autheticate/authenticate.service";
import { InfoAdminUsers, SendManager, trasabilidad } from "../../../interfaces/User";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

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

    public getUsers(): Observable<InfoAdminUsers[]> {
        this.loadHead();
        return this.http.get<InfoAdminUsers[]>(`${environment.apiAuthen}/administrador/obtenerUsuarios`, { headers: this.header })
    }

    public unlockUser(user: string): Observable<{response: string}> {
        this.loadHead()
        return this.http.get<{response: string}>(`${environment.apiAuthen}/administrador/desbloquear/${user}`, { headers: this.header });
    }

    public sendManager(manager: SendManager): Observable<{response: string}> {
        this.loadHead()
        return this.http.post<{response: string}>(`${environment.apiAuthen}/administrador/registrarGerente`, manager, { headers: this.header})
    }

    public getTrasabilidad(): Observable<trasabilidad[]> {
        this.loadHead()
        return this.http.get<trasabilidad[]>(`${environment.apiParame}/administrador/auditoria`, { headers: this.header})
    }
}