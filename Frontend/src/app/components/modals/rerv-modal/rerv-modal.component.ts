import { Component, DoCheck, OnInit } from '@angular/core';
import { infoParking } from '../../../interfaces/Parqueaderos';
import { ReserveState } from '../../../core/class/ReserveState';
import { Customer } from '../../../core/class/Customer';
import { InfoCard } from '../../../interfaces/User';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoGetFee, InfoReserveUser, InfoSendReserve } from '../../../interfaces/Reserve';
import { Parking } from '../../../core/class/Parking';
import { sha1 } from 'js-sha1';

@Component({
  selector: 'app-rerv-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rerv-modal.component.html',
  styleUrl: './rerv-modal.component.css'
})
export class RervModalComponent implements DoCheck, OnInit {
  private seguro: boolean = true;
  private seguroCost: boolean = true;

  public park: infoParking = this.reserveState.getReservePark()!;
  public reserveEdit: InfoReserveUser = this.reserveState.getEditReserve()!;
  public fees: InfoGetFee = {
    idTarifa: '',
    tarifaCarro: 0,
    tarifaMoto: 0,
    tarifaExtraCarro: 0,
    tarifaExtraMoto: 0
  };

  public horas: Array<string> = Array.from({ length: 24 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());
  public minutos: Array<string> = Array.from({ length: 60 }, (_, index) => index < 10 ? '0' + index.toString() : index.toString());
  public cards: InfoCard[] = this.customer.getCards()!;

  protected formReserve!: FormGroup;
  public errorMessage: string[] = [];

  private selectedCard!: InfoCard;
  public cost: number = 0;

  constructor(
    public reserveState: ReserveState,
    public parking: Parking,
    public customer: Customer,
    private form: FormBuilder
  ) {

  }

  ngOnInit() {
    this.formReserve = this.form.group({
      date: [this.reserveState.showEditReserve ? this.reserveEdit.fechaReserva : '', Validators.required],
      card: ['', Validators.required],
      csv: ['', Validators.required],
      vehiculo: [this.reserveState.showEditReserve ? this.reserveEdit.tipoVechiculo : '', Validators.required],
      horaIni: [this.reserveState.showEditReserve ? this.reserveEdit.fechaInicio.slice(0,2) : '', Validators.required],
      minIni: [this.reserveState.showEditReserve ? this.reserveEdit.fechaInicio.slice(3,5) : '', Validators.required],
      horaFin: [this.reserveState.showEditReserve ? this.reserveEdit.fechaFinal.slice(0,2) : '', Validators.required],
      minFin: [this.reserveState.showEditReserve ? this.reserveEdit.fechaFinal.slice(3,5) : '', Validators.required]
    })
  }

  changeSelectendCard(card: Event) {
    let c = <HTMLSelectElement>card.target;
    this.selectedCard = this.cards.filter((t) => t.identificador == c.value)[0]
  }

  ngDoCheck(): void {
    this.park = this.reserveState.getReservePark()!;
    if (this.park != undefined) if (this.fees.idTarifa == '' && this.seguro) {
      this.parking.loadFeePark(this.park.codTarifa);
      this.seguro = false;
    }
    if (this.parking.getFees() != undefined) this.fees = this.parking.getFees();
    if (this.reserveState.showEditReserve) {
      this.reserveEdit = this.reserveState.getEditReserve()!;
      if(this.seguroCost) {this.cost = this.reserveEdit.subTotal;this.seguroCost = false}
    }
  }

  sendReserve(type: string) {
    if (type == 'send') {
      this.errorMessage = [];
      this.verifyTime();
      if (parseInt(this.formReserve.value.csv) != this.selectedCard.codSegur) this.errorMessage.push('El CSV no concuerda con sus datos.');
      this.calcuCost();
      if (this.cost <= 0) this.errorMessage.push('La franja de tiempo ingresado no permite calcular el costo.')
      if (this.errorMessage.length == 0) {
        const info: InfoSendReserve = {
          idReserva: this.reserveState.showEditReserve ? this.reserveEdit.codReserva : 'PCK' + sha1(
            this.formReserve.value.date +
            this.formReserve.value.horaIni + this.formReserve.value.minIni +
            this.formReserve.value.horaFin + this.formReserve.value.minFin).slice(0, 10),
          fechaReserva: this.formReserve.value.date,
          tiempoInicio: this.formReserve.value.horaIni + ':' + this.formReserve.value.minIni + ':00',
          tiempoFinal: this.formReserve.value.horaFin + ':' + this.formReserve.value.minFin + ':00',
          subTotal: this.cost,
          numDocumento: this.customer.getInfo()?.K_NUM_DOCUMENTO!,
          tipoDoc: this.customer.getInfo()?.I_TIPO_DOC!,
          tipoVehiculo: this.formReserve.value.vehiculo,
          codParqueadero: this.park.codParqueadero
        }

        this.parking.sendReserve(info, this.reserveState.showModalReserve ? true : false);
      }
    } else if (type == 'delete') {
      this.parking.deleteReserve(this.reserveEdit.codReserva);
    }

  }

  transformTime(data: string): number {
    const time = data.split(':')
    const numero = parseInt(time[0] == '00' ? '24' : time[1] + time[1]);
    return numero;
  }

  calcuCost(e?: Event) {
    let r = this.formReserve.value.vehiculo;
    this.errorMessage = [];
    if (
      this.formReserve.value.vehiculo != '' &&
      this.formReserve.value.horaIni != '' &&
      this.formReserve.value.minIni != '' &&
      this.formReserve.value.horaFin != '' &&
      this.formReserve.value.minFin != ''
    ) {
      const [startHours, startMinutes] = [this.formReserve.value.horaIni, this.formReserve.value.minIni].map(Number);
      const [endHours, endMinutes] = [this.formReserve.value.horaFin, this.formReserve.value.minFin].map(Number);

      // Calcula los minutos totales desde el inicio del día para ambos tiempos
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;

      const tiempo = endTotalMinutes - startTotalMinutes;

      if (tiempo > 0) {
        let hTiempo = tiempo / 60;
        this.cost = this.formReserve.value.vehiculo == 'C' ? parseFloat((hTiempo * this.fees.tarifaCarro).toFixed(2)) : parseFloat((hTiempo * this.fees.tarifaMoto).toFixed(2));
      } else {
        if (e) this.errorMessage.push('La franja de tiempo ingresado no permite calcular el costo.')
        this.cost = 0;
      }
    } else {
      this.cost = 0;
    }
  }

  verifyTime() {
    const inicio = parseInt(this.formReserve.value.horaIni + this.formReserve.value.minIni)
    const fin = parseInt(this.formReserve.value.horaFin + this.formReserve.value.minFin)

    const today = new Date()
    const date = new Date(this.formReserve.value.date)
    
    const newDate = new Date(today); 
    newDate.setDate(today.getDate() + 30)

    if (date < today || date > newDate) this.errorMessage.push('La fecha está para un día erróneo, hasta 30 días de posible reservación.')

    if (this.park.i24Hrs !== 'S') {
      const apertura = this.transformTime(this.park.horaApertura)
      const cierre = this.transformTime(this.park.horaCierre)

      if (inicio < apertura || inicio > cierre - 30) this.errorMessage.push('Hora de inicio fuera de franja - Tiempo mínimo reserva 30 min.')
      if (fin < apertura + 30 || fin > cierre) this.errorMessage.push('Hora de fin fuera de franja - Tiempo mínimo reserva 30 min.')
    }

    if ((fin - inicio) < 30) this.errorMessage.push('Tiempo de reserva menor a 30 min.')
  }

  ocult() {
    this.reserveState.showModalReserve = false;
    this.reserveState.showEditReserve = false;
  }
}
