import { Component, DoCheck, OnInit } from '@angular/core';
import { infoParking } from '../../../interfaces/Paqueaderos';
import { ReserveState } from '../../../core/class/ReserveState';
import { Customer } from '../../../core/class/Customer';
import { InfoCard } from '../../../interfaces/User';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rerv-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rerv-modal.component.html',
  styleUrl: './rerv-modal.component.css'
})
export class RervModalComponent implements DoCheck, OnInit {
  public park: infoParking = this.reserveState.getReservePark();
  public horas: Array<string> = Array.from({ length: 24 }, (_, index) => index < 10 ? '0'+index.toString() : index.toString());
  public minutos: Array<string> = Array.from({ length: 60 }, (_, index) => index < 10 ? '0'+index.toString() : index.toString());
  public cards: InfoCard[] = this.customer.getCards();

  protected formReserve!: FormGroup;
  public errorMessage: string[] = [];

  private selectedCard!: InfoCard;

  constructor(
    public reserveState: ReserveState,
    public customer: Customer,
    private form: FormBuilder
  ) {

  }

  ngOnInit() {
    this.formReserve = this.form.group({
      date: ['', Validators.required],
      card: ['', Validators.required],
      csv: ['', Validators.required],
      vehiculo: ['', Validators.required],
      horaIni: ['', Validators.required],
      minIni: ['', Validators.required],
      horaFin: ['', Validators.required],
      minFin: ['', Validators.required]
    })
  }

  changeSelectendCard(card: Event) {
    let c = <HTMLSelectElement>card.target;
    this.selectedCard = this.cards.filter((t) => t.identificador == c.value)[0]
  }

  ngDoCheck(): void {
    if(this.reserveState.showModalReserve) this.park = this.reserveState.getReservePark();
    if(this.reserveState.showEditReserve) this.park = this.reserveState.getEditReserve();
  }

  sendReserve() {
    this.errorMessage = [];
    this.verifyTime();
    if(parseInt(this.formReserve.value.csv) !=  this.selectedCard.codSegur) this.errorMessage.push('El CSV no concuerda con sus datos.');

    if(this.errorMessage.length != 0) {

    }
  }

  transformTime(data: string): number {
    const time = data.split(':')
    const numero = parseInt(time[0] + time[1]);
    return numero;
  }

  verifyTime() {
    const inicio = parseInt(this.formReserve.value.horaIni + this.formReserve.value.minIni)
    const fin = parseInt(this.formReserve.value.horaFin + this.formReserve.value.minFin)

    const today = new Date()
    const date = new Date(this.formReserve.value.date)

    if(date < today || date > new Date(today.getDate() + 30)) this.errorMessage.push('La fecha está para un día erróneo, hasta 30 días de posible reservación.')

    if (this.park.i24Hrs !== 'S') {
      const apertura = this.transformTime(this.park.horaApertura)
      const cierre = this.transformTime(this.park.horaCierre)

      if(inicio < apertura || inicio > cierre - 30) this.errorMessage.push('Hora de inicio fuera de franja - Tiempo mínimo reserva 30 min.')
      if(fin < apertura + 30 || fin > cierre) this.errorMessage.push('Hora de fin fuera de franja - Tiempo mínimo reserva 30 min.')
    }

    if((fin - inicio) < 30) this.errorMessage.push('Tiempo de reserva menor a 30 min.')
  }

  ocult() {
    this.reserveState.showModalReserve = false;
    this.reserveState.showEditReserve = false;
  }
}
