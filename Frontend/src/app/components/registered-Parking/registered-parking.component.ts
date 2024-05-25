import { Component, DoCheck } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ManagerState } from '../../core/class/States/ManagerState';
import { EditParksComponent } from '../modals/edit-parks/edit-parks.component';
import { infoCities, infoParking } from '../../interfaces/Parqueaderos';
import { Parking } from '../../core/class/Objets/Parking';
import { Manager } from '../../core/class/Users/Manager';
import { AdminParkComponent } from '../modals/admin-park/admin-park.component';


@Component({
  selector: 'app-registered-parking',
  standalone: true,
  imports: [SidebarComponent, EditParksComponent, AdminParkComponent],
  templateUrl: './registered-parking.component.html',
  styleUrl: './registered-parking.component.css'
})
export class RegisteredParkingComponent implements DoCheck {
  public parkings!: infoParking[];
  public cities!: infoCities[];
  public seguro: boolean[] = [true, true];
  public parksForEdit: infoParking[] = [];

  public nameCity: string = '';

  constructor(public managerState: ManagerState, private parks: Parking, private manager: Manager) {

  }

  ngDoCheck(): void {
    if (this.parks.getParkings() == undefined && this.seguro[0]) { this.parks.loadParkings(); this.seguro[0] = false}
    if (this.parks.getCities() == undefined && this.seguro[1]) { this.parks.loadCities(); this.seguro[0] = false}
    this.parkings = this.parks.getParkings()!;
    this.cities = this.parks.getCities()!;

    if (this.parkings != undefined && this.manager.getInfo() != undefined && this.parks.getCities() != undefined) { 
      this.parkings = this.parkings.filter((p) => p.codGerente == this.manager.getInfo()?.K_COD_GERENTE)!

      this.nameCity = this.parkings[0].ciudad
    }
  }

  fillPark(parkInfo: infoParking) {
    const x = this.parksForEdit.find((p) => p == parkInfo);

    if(x == undefined) this.parksForEdit.push(parkInfo);
    else this.parksForEdit = this.parksForEdit.filter((p) => p !== parkInfo);
  }

  editAdmin(park: infoParking) {
    this.managerState.showModalAdmin = true;
    this.managerState.setEditParkAdmin(park);
  }
}
