import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDataInterface } from '../../interfaces/Login';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';
import { AuthenticateState } from '../../core/class/States/AuthenticateState';
import { NarBarComponent } from '../nar-bar/nar-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { SigninDataInterface } from '../../interfaces/Signin';
import * as sha1 from 'js-sha1'
import { Router } from '@angular/router';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { Customer } from '../../core/class/Users/Customer';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ReactiveFormsModule, NarBarComponent, RecaptchaV3Module],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit, DoCheck {
  protected FormLoginData!: FormGroup;
  protected FormSignData!: FormGroup;
  protected infoLogin!: LoginDataInterface;
  protected infoSignin!: SigninDataInterface;
  dataInvalid: string = '';
  status: boolean = false;

  siteKey: string;

  selectLog!: string;
  selectSign!: string;

  constructor(
    private form: FormBuilder,
    private AuService: AuthenticateService,
    public authenticate: AuthenticateState,
    private cookieService: CookieService,
    private root: Router,
    private recatchap: ReCaptchaV3Service,
    private customer: Customer,
  ) {
    this.siteKey = environment.siteKey;

    this.authenticate.setIsLoginShow(true);
    this.authenticate.setLogShow(this.cookieService.get('loginState') === 'true' ? true : false);
    this.authenticate.setSignShow(this.cookieService.get('signState') === 'true' ? true : false);

    this.selectLog = authenticate.getLogShow() ? 'bg-firstColor text-white' : ''
    this.selectSign = authenticate.getSignShow() ? 'bg-firstColor text-white' : ''
  }

  ngOnInit() {
    this.createForms();
    this.recatchap.execute('importantAction').subscribe((token) => { })
  }

  ngDoCheck() {

  }

  changeSelectedView(who: boolean) {
    this.selectLog = who ? 'bg-firstColor text-white' : ''
    this.selectSign = !who ? 'bg-firstColor text-white' : ''

    if (who) {
      this.authenticate.setLogShow(true);
      this.authenticate.setSignShow(false);
    } else {
      this.authenticate.setLogShow(false);
      this.authenticate.setSignShow(true);
    }

    this.status = false;
    this.dataInvalid = '';
  }

  createForms() {
    this.FormLoginData = this.form.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.FormSignData = this.form.group({
      firstName: ['', [Validators.required, this.authenticate.customValidator('')]],
      secondName: [],
      firstLastName: ['', [Validators.required, this.authenticate.customValidator('')]],
      secondLastName: ['', [Validators.required, this.authenticate.customValidator('')]],
      NID: ['', Validators.required],
      typeID: ['', Validators.required],
      numberCell: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, this.authenticate.customValidator('u')]],
      password: ['', [Validators.required, this.authenticate.customValidator('p')]]
    })
  }

  sendLogin() {
    this.infoLogin = {
      user: this.FormLoginData.value.user,
      password: sha1.sha1(this.FormLoginData.value.password)
    }

    Notiflix.Loading.dots()

    this.AuService.ActionLogin(this.infoLogin).subscribe({
      next: Response => {
        this.dataInvalid = Response.message
        this.status = false;

        this.AuService.cookieSession(this.infoLogin.user, Response.rol);
        this.AuService.cookieToken(Response.token);
        Notiflix.Loading.remove()
        Notiflix.Notify.success(Response.message, {timeout: 5000})
      },
      error: Error => {
        this.dataInvalid = Error.error.mensaje;
        this.status = true;
        Notiflix.Loading.remove()
        if(this.dataInvalid == null || this.dataInvalid == '' || this.dataInvalid == undefined) {
          Notiflix.Notify.failure(Error.error, { timeout: 5000})
        } else {
          Notiflix.Notify.failure(Error.error.mensaje, { timeout: 5000})
        }
      }
    })
  }

  sendSignin() {
    this.infoSignin = {
      firstName: this.FormSignData.value.firstName,
      secondName: this.FormSignData.value.secondName,
      firstLastName: this.FormSignData.value.firstLastName,
      secondLastName: this.FormSignData.value.secondLastName,
      NID: String(this.FormSignData.value.NID),
      typeID: this.FormSignData.value.typeID,
      numberCell: String(this.FormSignData.value.numberCell),
      email: this.FormSignData.value.email,
      userName: this.FormSignData.value.userName,
      password: sha1.sha1(this.FormSignData.value.password)
    }

    Notiflix.Loading.dots()

    this.AuService.ActionSignin(this.infoSignin).subscribe({
      next: Response => {
        this.dataInvalid = Response.message;
        this.status = false;

        this.AuService.cookieSession(this.infoSignin.userName, this.infoSignin.password);
        this.AuService.cookieToken(Response.token);
        this.customer.loadCustomer(this.infoSignin.userName)
        Notiflix.Loading.remove()
        Notiflix.Notify.success(Response.message, {timeout: 5000})
        this.root.navigate(['/userInterface']);
      },
      error: Error => {
        this.dataInvalid = Error.error.message;
        this.status = true;
        if(this.dataInvalid == null || this.dataInvalid == '' || this.dataInvalid == undefined) {
          Notiflix.Notify.failure(Error.error, { timeout: 5000})
        } else {
          Notiflix.Notify.failure(Error.error.mensaje, { timeout: 5000})
        }
      }
    })
  }
}
