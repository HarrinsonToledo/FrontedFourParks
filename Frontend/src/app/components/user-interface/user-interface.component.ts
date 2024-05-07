import { Component } from '@angular/core';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { SearchBarComponent } from '../maps/componentes/search-bar/search-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticateState } from '../../core/class/AuthenticateState';
import { ParkingServices } from '../../core/services/parking/parking.service';
import { infoCities, infoParking } from '../../interfaces/Paqueaderos';
import { MapService, PlacesService } from '../maps/servicios';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [MapScreenComponent, SearchBarComponent, RouterLink, RouterModule],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css'
})
export class UserInterfaceComponent {
  public w: string = 'w-20';
  public view: boolean = false;
  public arrow: string = 'arrowBarInv.png';
  public location: string = 'Location IconWhite.png';
  public car: string = 'CarIcon.png';
  public histo: string = 'HistorialIcon.png';
  public data: string = 'DataIcon.png';
  public log: string = 'LogOutIcon.png';
  public logo: string = ''
  public logoStyle: string = 'w-16 h-16 my-10 rounded-full';

  public cities!: Array<infoCities>; 
  public parking!: Array<infoParking>;
  public user!: string;

  constructor(private cookieService: CookieService, private root: Router, private autheticate: AuthenticateState,
    private parkingService: ParkingServices, private mapService: MapService, private placeService: PlacesService
  ) {
    if(cookieService.check('session')) {
      let cache = cookieService.get('session').split('|');
      this.user = cache[0];
    } else {
      root.navigate(['/'])
    }
  }

  ngOnInit() {
    this.parkingService.getCities().subscribe({
      next: Response => {
        this.cities = Response;
      },
      error: Error => {

      }
    })

    this.parkingService.getParking().subscribe({
      next: Response => {
        this.parking = Response;
      },
      error: Error => {

      }
    })
  }

  ngDoCheck() {
    this.w = this.view ? 'min_oculy:w-3/12 w-4/12' : 'w-20';
    this.arrow = this.view ? 'arrowBar.png' : 'arrowBarInv.png';
    this.logoStyle = this.view ? 'w-3/5 my-10 rounded-xl mx-auto p-1 border-2 border-white' : 'w-12 my-10 rounded-full';
    this.logo = this.view ? 'LOGOBL.png' : 'LOGOLocation.png';
  }

  filterCity(city: Event) {
    let c = <HTMLSelectElement>city.target
    this.parkingService.getParking().subscribe({
      next: Response => {
        this.parking = Response;
        this.parking = this.parking.filter(p => p.ciudad === c.value)
      },
      error: Error => {

      }
    })
  }

  flyTo(park: infoParking) {
    const [lng, lat] = [park.longitud, park.latitud]
    this.mapService.flyTo([lng, lat])
    this.mapService.createMarkersFromPark(park);
  }

  clearCookies() {
    this.autheticate.setIsLoginShow(false);
    this.cookieService.deleteAll();
  }

  routePark(park: infoParking) {
    if(!this.placeService.useLocation) throw Error('No hay userLocation');
    const start=this.placeService.useLocation;
    const end = [park.longitud, park.latitud] as [number, number];

    this.mapService.getRouteBetweenPoints(start,end);
  }
}
