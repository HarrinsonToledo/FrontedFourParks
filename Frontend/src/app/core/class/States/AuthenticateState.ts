import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

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
        this.cookieService.set('signState', this.signShow ? 'true' : 'false');
    }

    public getSignShow(): boolean {
        return this.signShow;
    }

    public customValidator(type: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.setError(control.value, type) !== '') {
                return { error: { value: control.value } };
            }
            return null;
        };
    }

    public setError(value: string, type: string, errorEmail?: boolean): string {
        let messageError = '';
        messageError = this.verifyHaveSpaces(value) ? messageError + 'Sin Espacios <br>' : messageError + ''
        if (type === 'u' || type === 'p') {
            messageError = this.verifyCC(value) ? messageError + '5 a 8 Caracteres <br>' : messageError + ''
        }
        if (type === 'p') {
            messageError = !this.verifyValidPassword(value) ? messageError + 'Debe contener almenos una letra minúscula <br> una letra mayúscula y un número' : messageError + ''
        }
        if (type === 'e') {
            messageError = errorEmail ? messageError + 'Formato de Email Invalido <br>' : messageError + ''
        }
        return messageError;
    }

    public verifyCC(input: string): boolean {
        if (input.length > 4 && input.length < 9) {
            return false
        }
        return true
    }

    public verifyHaveSpaces(input: string): boolean {
        let regex = /\s/;
        return regex.test(input);
    }

    public verifyValidPassword(input: string) {
        let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/;
        return regex.test(input);
    }
}