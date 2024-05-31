import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateState } from '../../../core/class/States/AuthenticateState';
import { Manager } from '../../../core/class/Users/Manager';
import { InfoSendPassword } from '../../../interfaces/User';
import { sha1 } from 'js-sha1';

@Component({
  selector: 'app-manager-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manager-pass.component.html',
  styleUrl: './manager-pass.component.css'
})
export class ManagerPassComponent implements OnInit {
  public formPassword!: FormGroup;
  public errorMessage: string[] = [];

  constructor(
    private form: FormBuilder, 
    public authenticate: AuthenticateState,
    public manager: Manager
  ) {

  }

  ngOnInit(): void {
    this.formPassword = this.form.group({
      password: ['', [Validators.required, this.authenticate.customValidator('p')]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  sendPassword() {
    const info: InfoSendPassword = {
      nameUser: this.manager.getInfo()!.N_NOMBRE_USUARIO,
      password: sha1(this.formPassword.value.password)
    }
    this.manager.changePassword(info);
  }
}
