import { Component, DoCheck } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArriveModalComponent } from '../modals/arrive-modal/arrive-modal.component';
import { ReserveState } from '../../core/class/ReserveState';
import { infoParking } from '../../interfaces/Paqueaderos';
import { Parking } from '../../core/class/Parking';
import { RervModalComponent } from '../modals/rerv-modal/rerv-modal.component';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [SidebarComponent, ArriveModalComponent, RervModalComponent],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent implements DoCheck {
  public myReservations: infoParking[] = this.parks.getParkings();
  public hidden: string = 'hidden';

  constructor(
    public reserveState: ReserveState,
    private parks: Parking
  ) {

  }

  ngDoCheck(): void {
    if (this.parks.getParkings() == undefined || this.parks.getParkings().length == 0) this.parks.loadParkings();
    this.myReservations = this.parks.getParkings();
  }

  goMap(park: infoParking) {
    this.reserveState.setParkArrive(park);
    this.reserveState.showArriveModal = true;

  }

  goEdit(park: infoParking) {
    this.reserveState.setEditReserve(park);
    this.reserveState.showEditReserve = true;
  }
}
