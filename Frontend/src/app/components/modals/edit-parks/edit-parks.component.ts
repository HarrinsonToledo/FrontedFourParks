import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManagerState } from '../../../core/class/States/ManagerState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Parking } from '../../../core/class/Objets/Parking';
import { InfoEditPark, InfoGetFee } from '../../../interfaces/Parqueaderos';
import Notiflix from 'notiflix';
import { Manager } from '../../../core/class/Users/Manager';

@Component({
  selector: 'app-edit-parks',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-parks.component.html',
  styleUrl: './edit-parks.component.css'
})
export class EditParksComponent implements OnInit, DoCheck {
  @ViewChild('mySelect1') mySelect1!: ElementRef<HTMLSelectElement>;
  @ViewChild('mySelect2') mySelect2!: ElementRef<HTMLSelectElement>;
  @ViewChild('mySelect3') mySelect3!: ElementRef<HTMLSelectElement>;
  @ViewChild('mySelect4') mySelect4!: ElementRef<HTMLSelectElement>;

  public formEdit!: FormGroup;
  public horas: Array<string> = Array.from({ length: 24 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());
  public minutos: Array<string> = Array.from({ length: 60 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());

  private seguroFees: boolean = true;

  public is24: boolean = false;
  public isFide: boolean = false;

  constructor(
    public managerState: ManagerState,
    private form: FormBuilder,
    private parks: Parking,
    private manager: Manager
  ) {

  }

  changeIs24() {
    this.is24 = !this.is24;
    this.mySelect1.nativeElement.disabled = this.is24;
    this.mySelect2.nativeElement.disabled = this.is24;
    this.mySelect3.nativeElement.disabled = this.is24;
    this.mySelect4.nativeElement.disabled = this.is24;

    if (this.is24) {
      this.formEdit.get('horaAper')?.setValue('00');
      this.formEdit.get('minAper')?.setValue('00');
      this.formEdit.get('horaCier')?.setValue('00');
      this.formEdit.get('minCier')?.setValue('00');
    }
  }

  ngOnInit(): void {
    this.formEdit = this.form.group({
      feeMoto: ['', Validators.required],
      feeCarro: ['', Validators.required],
      feeMotoEx: ['', Validators.required],
      feeCarroEx: ['', Validators.required],
      capacity: ['', Validators.required],
      characteristics: ['', Validators.required],
      horaAper: ['00', Validators.required],
      minAper: ['00', Validators.required],
      horaCier: ['00', Validators.required],
      minCier: ['00', Validators.required]
    })
  }

  ngDoCheck(): void {
    if (this.parks.getAllFees() == undefined && this.seguroFees) {
      this.parks.loadAllFees();
      this.seguroFees = false;
    }
  }

  verifyEmptyTime(): boolean {
    const important = ['horaAper', 'minAper', 'horaCier', 'minCier'];
    let emptyTime = false;
    important.forEach(key => {
      const control = this.formEdit.get(key);
      if (control && control.value !== '00') {
        emptyTime = true;
      }
    })
    return emptyTime;
  }

  verifyTimeRange(): boolean {
    let bool = false;
    if (this.is24) {
      bool = true;
    } else if(this.verifyEmptyTime()) {
      const apertura = parseInt(this.formEdit.get('horaAper')?.value) * 60 + parseInt(this.formEdit.get('minAper')?.value)
      const cierre = parseInt(this.formEdit.get('horaCier')?.value) * 60 + parseInt(this.formEdit.get('minCier')?.value)

      if (cierre < apertura || (cierre - apertura) < 240) {
        Notiflix.Notify.warning("No se puede establecer un horario menor a 4 horas.", { timeout: 5000 })
        bool = false;
      } else {
        bool = true;
      }
    } else {
      Notiflix.Notify.warning("24 horas no seleccionado, defina la franja horaria", { timeout: 5000 })
      bool = false;
    }
    return bool;
  }

  /*areAllFieldsEmpty(): boolean {
    let allEmpty = true;
    Object.keys(this.formEdit.controls).forEach(key => {
      const control = this.formEdit.get(key);
      if (control && control.value !== null && control.value !== '') {
        allEmpty = false;
      }
    })
    return allEmpty;
  }*/

  sendChanges() {
    const x: InfoEditPark[] = [];

    if (this.verifyTimeRange()) {
      this.managerState.getEditParksData().map((p) => {
        const tarifas: InfoGetFee = this.parks.getAllFees()?.find((f) => f.idTarifa == p.codTarifa)!;
        const edit: InfoEditPark = {
          direccion: p.direccion,
          codTarifa: p.codTarifa,
          nombre: p.nombre,
          i24Hrs: this.is24 ? 'S' : 'N',
          latitud: p.latitud,
          longitud: p.longitud,
          codGerente: p.codGerente,
          codParqueadero: p.codParqueadero,
          iFidelizacion: this.isFide ? 'S' : 'N',
          ciudad: p.ciudad,
          iEstado: p.iEstado,
          tarifaMoto: this.formEdit.value.feeMoto !== '' ? parseInt(this.formEdit.value.feeMoto) : tarifas.tarifaMoto,
          tarifaCarro: this.formEdit.value.feeCarro !== '' ? parseInt(this.formEdit.value.feeCarro) : tarifas.tarifaCarro,
          tarifaExtraCarro: this.formEdit.value.feeCarroEx !== '' ? parseInt(this.formEdit.value.feeCarroEx) : tarifas.tarifaExtraCarro,
          tarifaExtraMoto: this.formEdit.value.feeMotoEx !== '' ? parseInt(this.formEdit.value.feeMotoEx) : tarifas.tarifaExtraMoto,
          numPuestos: this.formEdit.value.capacity != '' ? parseInt(this.formEdit.value.capacity) : p.numPuestos,
          tipoParqueadero: this.formEdit.value.characteristics != '' ? this.formEdit.value.characteristics : p.tipoParqueadero,
          horaApertura: this.verifyEmptyTime() ? this.formEdit.value.horaAper + ':' + this.formEdit.value.minAper + ':00' : null,
          horaCierre: this.verifyEmptyTime() ? this.formEdit.value.horaCier + ':' + this.formEdit.value.minCier + ':00' : null,
        }
        x.push(edit);
      });

      this.manager.editParks(x);
      console.log(x)
    }
  }
}
