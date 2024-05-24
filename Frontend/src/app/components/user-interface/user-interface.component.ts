import { Component, DoCheck, OnInit } from '@angular/core';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { SearchBarComponent } from '../maps/componentes/search-bar/search-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { infoCities, infoParking } from '../../interfaces/Parqueaderos';
import { MapService, PlacesService } from '../maps/servicios';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RervModalComponent } from '../modals/rerv-modal/rerv-modal.component';
import { ReserveState } from '../../core/class/States/ReserveState';
import { Parking } from '../../core/class/Objets/Parking';
import { ParkingServices } from '../../core/services/parking/parking.service';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [MapScreenComponent, SidebarComponent, SearchBarComponent, RervModalComponent, RouterLink, RouterModule],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css',
})
export class UserInterfaceComponent implements DoCheck, OnInit {

  public cities!: Array<infoCities>;
  public parking!: Array<infoParking>;
  public user!: string;
  public show: boolean = this.reserveState.showModalReserve;

  constructor(
    private parks: Parking,
    private mapService: MapService,
    private placeService: PlacesService,
    private reserveState: ReserveState,
    private parkingService: ParkingServices
  ) {

  }

  ngDoCheck(): void {
    this.show = this.reserveState.showModalReserve;

    if (this.cities == undefined || this.parking == undefined) {
      this.cities = this.parks.getCities()!
      this.parking = this.parks.getParkings()!
    }
  }

  ngOnInit() {

  }

  filterCity(city: Event) {
    let c = <HTMLSelectElement>city.target;
    this.parkingService.getParking().subscribe({
      next: (Response) => {
          this.parking = Response;
          if (c.value !== "Seleccionar") {
              this.parking = this.parking.filter((p) => p.ciudad === c.value);
              this.mapService.createMarkersForAllParks(this.parking)
          }
      },
      error: (Error) => { },
  });
  }

  flyTo(park: infoParking) {
    const [lng, lat] = [park.longitud, park.latitud];
    this.mapService.flyTo([lng, lat]);
    this.mapService.createMarkersFromPark(park);
  }

  routePark(park: infoParking) {
    if (!this.placeService.useLocation) throw Error('No hay userLocation');
    this.flyTo(park)
    const start = this.placeService.useLocation;
    const end = [park.longitud, park.latitud] as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }

  reserve(park: infoParking) {
    this.reserveState.showModalReserve = true;
    this.reserveState.setReservePark(park);
  }
}
