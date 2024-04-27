import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginDataInterface } from '../../interfaces/Login';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';
import { AuthenticateState } from '../../core/class/AuthenticateState';
import { NarBarComponent } from '../nar-bar/nar-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { SigninDataInterface } from '../../interfaces/Signin';
import * as sha1 from 'js-sha1'

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ReactiveFormsModule, NarBarComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  FormLoginData!: FormGroup;
  FormSignData!: FormGroup;
  infoLogin!: LoginDataInterface;
  infoSignin!: SigninDataInterface;
  dataInvalid: string = '';

  selectLog!: string;
  selectSign!: string;

  constructor(private form: FormBuilder, private AuService: AuthenticateService, public authenticate: AuthenticateState,
      private cookieService: CookieService
  ) {
    this.authenticate.setIsLoginShow(true);
    this.authenticate.setLogShow(this.cookieService.get('loginState') === 'true' ? true : false);
    this.authenticate.setSignShow(this.cookieService.get('signState') === 'true' ? true : false);
    
    this.selectLog = authenticate.getLogShow() ? 'bg-firstColor text-white': ''
    this.selectSign = authenticate.getSignShow() ? 'bg-firstColor text-white': ''
  }

  ngOnInit() {
    this.createForms();
  }

  ngDoCheck() {
    
  }

  changeSelectedView(who: boolean) {
    this.selectLog = who ? 'bg-firstColor text-white': ''
    this.selectSign = !who ? 'bg-firstColor text-white': ''

    if (who) {
      this.authenticate.setLogShow(true);
      this.authenticate.setSignShow(false);
    } else {
      this.authenticate.setLogShow(false);
      this.authenticate.setSignShow(true);
    }
  }

  createForms() {
    this.FormLoginData = this.form.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.FormSignData = this.form.group({
      firstName: ['', [Validators.required, this.customValidator('')]],
      secondName:[],
      firstLastName: ['', [Validators.required, this.customValidator('')]],
      secondLastName: ['', Validators.required],
      NID: ['', Validators.required],
      typeID: ['', Validators.required],
      numberCell: ['', Validators.required],
      email: ['', Validators.email],
      userName: ['', [Validators.required, this.customValidator('u')]],
      password: ['', [Validators.required, this.customValidator('p')]]
    })
  }

  sendLogin() {
    this.infoLogin = {
      user: this.FormLoginData.value.user,
      password: this.FormLoginData.value.password
    }

    this.AuService.ActionLogin(this.infoLogin).subscribe({
      next: Response => {
        this.dataInvalid = Response.mensaje
      },
      error: Error => {
        this.dataInvalid = Error.error.mensaje;
      }
    })
  }

  sendSignin() {
    this.infoSignin = {
      firstName: this.FormSignData.value.firstName,
      secondName: this.FormSignData.value.secondName,
      firstLastName: this.FormSignData.value.firstLastName,
      secondLastName: this.FormSignData.value.secondLastName,
      NID: this.FormSignData.value.NID,
      typeID: this.FormSignData.value.typeID,
      numberCell: this.FormSignData.value.numberCell,
      email: this.FormSignData.value.email,
      userName: this.FormSignData.value.userName,
      password: sha1.sha1(this.FormSignData.value.password)
    }

    console.log(this.infoSignin)
  }

  customValidator(type: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.setError(control.value, type) !== '') {
        return { error: { value: control.value}};
      }
      return null;
    };
  }

  setError(value: string, type: string): string {
    let messageError = '';
    messageError = this.verifyHaveSpaces(value) ? messageError + 'Sin Espacios <br>' : messageError +  ''
    if(type === 'u' || type === 'p') {
      messageError = this.verifyCC(value) ? messageError + '5 a 8 Caracteres <br>' : messageError +  ''
    } 
    if (type === 'p') {
      messageError = !this.verifyValidPassword(value) ? messageError + 'Debe contener almenos una letra minúscula <br> una letra mayúscula y un número' : messageError +  ''
    }
    if (type === 'e') {
      messageError = this.FormSignData.get('email')?.hasError('email') ? messageError + 'Formato de Email Invalido <br>' : messageError +  ''
    }
    return messageError;
  }

  verifyCC(input: string): boolean {
    if(input.length > 4 && input.length < 9) {
      return false
    }
    return true
  }

  verifyHaveSpaces(input: string): boolean {
    let regex = /\s/;
    return regex.test(input);
  }

  verifyValidPassword(input: string) {
    let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/;
    return regex.test(input);
  }
}
