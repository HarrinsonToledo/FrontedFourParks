import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateState {
    private isLoginShow: boolean = false;
    private logShow: boolean = false;
    private signShow: boolean = false;

    constructor(private cookieService: CookieService) {

    }

    public setIsLoginShow(state: boolean) {
        this.isLoginShow = state;
    }

    public getIsLoginShow(): boolean {
        return this.isLoginShow;
    }
    
    public setLogShow(state: boolean) {
        this.logShow = state;
        this.cookieService.set('loginState', this.logShow ? 'true' : 'false');
    }

    public getLogShow(): boolean {
        return this.logShow;
    }

    public setSignShow(state: boolean) {
        this.signShow = state;
        this.cookieService.set('signState',this.signShow ? 'true' : 'false');
    }

    public getSignShow(): boolean {
        return this.signShow;
    }
}