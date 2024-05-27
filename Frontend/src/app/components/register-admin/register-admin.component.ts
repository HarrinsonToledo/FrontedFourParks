import { Component, DoCheck, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Parking } from '../../core/class/Objets/Parking';
import { infoParking } from '../../interfaces/Parqueaderos';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateState } from '../../core/class/States/AuthenticateState';
import Notiflix from 'notiflix';
import { sha1 } from 'js-sha1';
import { SendManager } from '../../interfaces/User';
import { Administrator } from '../../core/class/Users/Administrator';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent implements DoCheck, OnInit {
  public parking!: infoParking[];

  public formManager!: FormGroup;

  constructor(
    private parks: Parking,
    private form: FormBuilder,
    private autheticate: AuthenticateState,
    private admin: Administrator
  ) {

  }

  ngOnInit(): void {
    this.formManager = this.form.group({
      user: ['', [Validators.required, this.autheticate.customValidator('u')]],
      fn: ['', [Validators.required, this.autheticate.customValidator('')]],
      fln: ['', [Validators.required, this.autheticate.customValidator('')]],
      sn: [''],
      sln: ['', [Validators.required, this.autheticate.customValidator('')]],
      email: ['', [Validators.required, Validators.email]],
      park: ['', Validators.required]
    })
  }

  ngDoCheck(): void {
    if (this.parks.getParkings() == undefined && this.parks.seguroParks) {
      this.parks.loadParkings();
      this.parks.seguroParks = false;
    }
    if (this.parks.getParkings() != undefined) {
      this.parking = this.parks.getParkings()?.filter((p) => p.codGerente == null)!;
    }
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPGRSTUVWXYZabcdefghijklnmopqrstuvwxyz1234567'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randowIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randowIndex);
    }
    return result;
  }

  send() {
    let x = 0
    Object.keys(this.formManager.controls).forEach(key => {
      const control = this.formManager.get(key)
      if (control && !control.valid) {
        x = x + 1;
      }
    })
    if (x == 0) {
      const pass = this.generateRandomString(10);
      const info: SendManager = {
        userName: this.formManager.value.user,
        pass: pass,
        passSha: sha1(pass),
        email: this.formManager.value.email,
        primerNombre: this.formManager.value.fn,
        segundoNombre: this.formManager.value.sn != '' ? this.formManager.value.sn : null,
        primerApellido: this.formManager.value.fln,
        segundoApellido: this.formManager.value.sln,
        codGerente: sha1(pass + this.formManager.value.user).slice(0,10),
        codParqueadero: this.formManager.value.park
      }
      this.admin.sendManager(info);
    } else {
      Notiflix.Notify.failure('Tienes ' + x + ' campo(s) incorrepto(s)');
    }
  }
}
