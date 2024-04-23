import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateState {
    private isLoginShow: boolean = false;

    constructor() {

    }

    public setIsLoginShow(state: boolean) {
        this.isLoginShow = state;
    }

    public getIsLoginShow(): boolean {
        return this.isLoginShow;
    }
    
}