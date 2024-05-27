import { Component, DoCheck, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoReserveUser } from '../../interfaces/Reserve';
import { Parking } from '../../core/class/Objets/Parking';
import { Customer } from '../../core/class/Users/Customer';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit, DoCheck {
  public formFilter!: FormGroup;
  public items!: InfoReserveUser[];
  public copiaItems!: InfoReserveUser[]; 

  private seguros : boolean[] = [true, true, true]

  constructor(
    private form: FormBuilder, 
    private parking: Parking, 
    private customer: Customer,
    private authe: AuthenticateService
  ) {

  }

  ngDoCheck(): void {
    if(this.customer.getInfo() == undefined && this.seguros[0]) {
      this.customer.loadCustomer(this.authe.getCookieSessionCustomer(), true);
      this.seguros[0] = false;
    }
    if(this.parking.getReserves() == undefined && this.customer.getInfo() != undefined && this.seguros[1]) {
      this.parking.loadReserves(this.customer.getInfo()?.K_NUM_DOCUMENTO!, this.customer.getInfo()?.I_TIPO_DOC!);
      this.seguros[1] = false;
    }
    if (this.items == undefined && this.copiaItems != undefined) this.items = this.copiaItems;
    this.copiaItems = this.parking.getReserves()!;
  }

  getNamePark(Info: InfoReserveUser): string {
    const t = this.parking.getParkings()!.find((p) => p.codParqueadero === Info.codParqueadero)?.nombre!
    return t;
  }

  ngOnInit(): void {
      this.formFilter = this.form.group({
        code: ['', Validators.required],
        date: ['', Validators.required],
        state: ['S', Validators.required]
      })
  }

  select(st: Event) {
    const lt: string = this.formFilter.get('code')?.value || ''
    this.items = this.copiaItems;
    this.items = this.formFilter.value.code != '' ? this.items.filter((p) => p.codReserva.slice(0, lt.length) == this.formFilter.value.code) : this.items;
    this.items = this.formFilter.value.date != '' ? this.items.filter((p) => p.fechaReserva == this.formFilter.value.date) : this.items;
    this.items = this.formFilter.value.state != 'S' ? this.items.filter((p) => p.estado == this.formFilter.value.state) : this.items;
  }
}
