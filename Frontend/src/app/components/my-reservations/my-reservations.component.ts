import { Component, DoCheck } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArriveModalComponent } from '../modals/arrive-modal/arrive-modal.component';
import { ReserveState } from '../../core/class/ReserveState';
import { infoParking } from '../../interfaces/Parqueaderos';
import { Parking } from '../../core/class/Parking';
import { RervModalComponent } from '../modals/rerv-modal/rerv-modal.component';
import { Customer } from '../../core/class/Customer';
import { InfoReserveUser } from '../../interfaces/Reserve';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [SidebarComponent, ArriveModalComponent, RervModalComponent],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent implements DoCheck {
  public myReservations: Array<InfoReserveUser> | undefined;
  public hidden: string = 'hidden';

  public seguros: boolean[] = [true, true, true];

  constructor(
    public reserveState: ReserveState,
    private customer: Customer,
    private parks: Parking,
    private AutheService: AuthenticateService
  ) {
    this.myReservations = undefined;
  }

  ngDoCheck(): void {
    if (this.customer.getInfo() == undefined && this.seguros[0]) {this.customer.loadCustomer(this.AutheService.getCookieSession()[0]);this.seguros[0] = false}
    if (this.parks.getParkings() == undefined && this.seguros[1]) {this.parks.loadParkings();this.seguros[1] = false}
    if (this.parks.getCities() == undefined && this.seguros[2]) {this.parks.loadCities();this.seguros[2] = false}
    if (this.parks.getReserves() == undefined && this.customer.getInfo() != undefined && this.reserveState.seguroReserves) {this.parks.loadReserves(this.customer.getInfo()!.K_NUM_DOCUMENTO, this.customer.getInfo()!.I_TIPO_DOC); this.reserveState.seguroReserves = false}
    if (this.parks.getReserves() != undefined ) this.myReservations = this.parks.getReserves()!.filter((r) => r.estado == 'A');
  }


  getNamePark(Info: InfoReserveUser): string {
    const t = this.parks.getParkings()!.find((p) => p.codParqueadero === Info.codParqueadero)?.nombre!
    return t;
  }

  getAddress(Info: InfoReserveUser): string {
    const t = this.parks.getParkings()!.find((p) => p.codParqueadero === Info.codParqueadero)?.direccion!
    return t;
  }

  getCity(Info: InfoReserveUser): string {
    const t = this.parks.getParkings()!.find((p) => p.codParqueadero === Info.codParqueadero)?.ciudad!
    return t;
  }

  goMap(park: string) {
    const p: infoParking = this.parks.getParkings()!.find((e) => e.codParqueadero == park)!
    this.reserveState.setParkArrive(p);
    this.reserveState.showArriveModal = true;
  }

  goEdit(reserve: InfoReserveUser) {
    this.reserveState.setEditReserve(reserve);
    const p: infoParking = this.parks.getParkings()!.find((e) => e.codParqueadero == reserve.codParqueadero)!
    this.reserveState.setReservePark(p)
    this.reserveState.showEditReserve = true;
  }
}
