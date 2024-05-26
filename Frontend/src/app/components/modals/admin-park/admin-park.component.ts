import { Component, DoCheck, OnInit } from '@angular/core';
import { ManagerState } from '../../../core/class/States/ManagerState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Parking } from '../../../core/class/Objets/Parking';
import { infoParking } from '../../../interfaces/Parqueaderos';
import { Manager } from '../../../core/class/Users/Manager';

@Component({
  selector: 'app-admin-park',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-park.component.html',
  styleUrl: './admin-park.component.css'
})
export class AdminParkComponent implements OnInit, DoCheck {
  public formAdmin!: FormGroup;
  constructor(
    public managerState: ManagerState,
    private form: FormBuilder,
    private paks: Parking,
    private manager: Manager
  ) {

  }

  ngOnInit(): void {
    this.formAdmin = this.form.group({
      name: [this.managerState.getEditParkAdmin().nombre, Validators.required],
      address: [this.managerState.getEditParkAdmin().direccion, Validators.required],
      latitude: [this.managerState.getEditParkAdmin().longitud, Validators.required],
      longitude: [this.managerState.getEditParkAdmin().latitud, Validators.required]
    })
  }

  ngDoCheck(): void {
    if (this.paks.getParkings() == undefined && this.paks.seguroParks) {
      this.paks.loadParkings();
      this.paks.seguroParks = false;
    }
  }

  checkLatLong(): boolean {
    let x = false;
    this.paks.getParkings()?.map((p) => {
      if (p != this.managerState.getEditParkAdmin()) {
        if (p.latitud == parseFloat(this.formAdmin.value.latitude)
          && p.longitud == parseFloat(this.formAdmin.value.longitude)
        ) {
          x = true;
        }
      }
    })

    return x
  }

  checkAddress(): boolean {
    let x = false;
    this.paks.getParkings()?.map((p) => {
      if (p != this.managerState.getEditParkAdmin() && p.ciudad == this.managerState.getEditParkAdmin().ciudad) {
        if (p.direccion == this.formAdmin.value.address) {
          x = true;
        }
      }
    })

    return x
  }

  sendData() {
    if (!this.checkAddress() && !this.checkLatLong()) {
      let latitud = this.formAdmin.value.latitude.toString().split('.')
      latitud = [latitud[0], latitud[1].slice(0,8)].join('.')
      let longitud = this.formAdmin.value.longitude.toString().split('.')
      longitud = [longitud[0], longitud[1].slice(0,8)].join('.')
      const info: infoParking = {
        codParqueadero: this.managerState.getEditParkAdmin().codParqueadero,
        nombre: this.formAdmin.value.name,
        iEstado: this.managerState.getEditParkAdmin().iEstado,
        i24Hrs: this.managerState.getEditParkAdmin().i24Hrs,
        horaApertura: this.managerState.getEditParkAdmin().horaApertura,
        horaCierre: this.managerState.getEditParkAdmin().horaCierre,
        iFidelizacion: this.managerState.getEditParkAdmin().iFidelizacion,
        direccion: this.formAdmin.value.address,
        latitud: parseFloat(longitud),
        longitud: parseFloat(latitud),
        codGerente: this.managerState.getEditParkAdmin().codGerente,
        tipoParqueadero: this.managerState.getEditParkAdmin().tipoParqueadero,
        ciudad: this.managerState.getEditParkAdmin().ciudad,
        codTarifa: this.managerState.getEditParkAdmin().codTarifa,
        numPuestos: this.managerState.getEditParkAdmin().numPuestos
      }
      this.manager.adminPark(info);
    }
  }
}
