import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDataInterface } from '../../interfaces/Login';
import { AuthenticateService } from '../../core/services/authenticate.service';
import { AuthenticateState } from '../../core/class/AuthenticateState';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  FormLoginData!: FormGroup;
  FormRegister!: FormGroup;
  infoLogin!: LoginDataInterface;
  dataInvalid: string = '';

  constructor(private form: FormBuilder, private AuService: AuthenticateService, private authenticate: AuthenticateState) {
    authenticate.setIsLoginShow(true);
  }

  ngOnInit() {
    this.createFormLogin();
  }

  createFormLogin() {
    this.FormLoginData = this.form.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  sendLogin() {
    this.infoLogin = {
      user: this.FormLoginData.value.user,
      password: this.FormLoginData.value.password
    }

    if(this.verifyCC(this.FormLoginData.value.user) || this.verifyHaveSpaces(this.FormLoginData.value.user)
      || this.verifyHaveSpaces(this.FormLoginData.value.password) || this.verifyCC(this.FormLoginData.value.password)) {
        this.dataInvalid = 'Por favor Ingrese los datos correctamente'
    } else {
        console.log(this.infoLogin);
    }
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
}
