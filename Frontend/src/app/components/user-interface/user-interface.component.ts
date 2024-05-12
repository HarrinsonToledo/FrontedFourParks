import { Component } from '@angular/core';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { SearchBarComponent } from '../maps/componentes/search-bar/search-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticateState } from '../../core/class/AuthenticateState';
import { ParkingServices } from '../../core/services/parking/parking.service';
import { infoCities, infoParking } from '../../interfaces/Paqueaderos';
import { MapService, PlacesService } from '../maps/servicios';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [MapScreenComponent, SidebarComponent,SearchBarComponent, RouterLink, RouterModule],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css',
})
export class UserInterfaceComponent {

  public cities!: Array<infoCities>;
  public parking!: Array<infoParking>;
  public user!: string;

  constructor(
    private cookieService: CookieService,
    private root: Router,
    private autheticate: AuthenticateState,
    private parkingService: ParkingServices,
    private mapService: MapService,
    private placeService: PlacesService
  ) {
    if (cookieService.check('session')) {
      let cache = cookieService.get('session').split('|');
      this.user = cache[0];
    } else {
      root.navigate(['/']);
    }
  }

  ngOnInit() {
    this.parkingService.getCities().subscribe({
      next: (Response) => {
        this.cities = Response;
      },
      error: (Error) => {},
    });

    this.parkingService.getParking().subscribe({
      next: (Response) => {
        this.parking = Response;
      },
      error: (Error) => {},
    });
  }

  filterCity(city: Event) {
    let c = <HTMLSelectElement>city.target;
    this.parkingService.getParking().subscribe({
      next: (Response) => {
        this.parking = Response;
        if (c.value !== "Seleccionar") {
          this.parking = this.parking.filter((p) => p.ciudad === c.value);
        }
        this.mapService.createMarkersForAllParks(this.parking)
      },
      error: (Error) => {},
    });
  }

  flyTo(park: infoParking) {
    const [lng, lat] = [park.longitud, park.latitud];
    this.mapService.flyTo([lng, lat]);
    this.mapService.createMarkersFromPark(park);
  }

  clearCookies() {
    this.autheticate.setIsLoginShow(false);
    this.cookieService.deleteAll();
  }

  routePark(park: infoParking) {
    if (!this.placeService.useLocation) throw Error('No hay userLocation');
    const start = this.placeService.useLocation;
    const end = [park.longitud, park.latitud] as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }
}
