import { Component, DoCheck } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ManagerState } from '../../core/class/States/ManagerState';
import { EditParksComponent } from '../modals/edit-parks/edit-parks.component';
import { infoParking } from '../../interfaces/Parqueaderos';
import { Parking } from '../../core/class/Objets/Parking';


@Component({
  selector: 'app-registered-parking',
  standalone: true,
  imports: [SidebarComponent, EditParksComponent],
  templateUrl: './registered-parking.component.html',
  styleUrl: './registered-parking.component.css'
})
export class RegisteredParkingComponent implements DoCheck {
  public parkings!: infoParking[];
  public seguro: boolean = true;
  public parksForEdit: infoParking[] = [];

  constructor(public managerState: ManagerState, private parks: Parking) {

  }

  ngDoCheck(): void {
    if (this.parks.getParkings() == undefined && this.seguro) this.parks.loadParkings()
    this.parkings = this.parks.getParkings()!;
  }

  fillPark(parkInfo: infoParking) {
    const x = this.parksForEdit.find((p) => p == parkInfo);

    if(x == undefined) this.parksForEdit.push(parkInfo);
    else this.parksForEdit = this.parksForEdit.filter((p) => p !== parkInfo);
  }
}
