import { Component, OnInit } from '@angular/core';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { SearchBarComponent } from '../maps/componentes/search-bar/search-bar.component';
import { RouterModule } from '@angular/router';
import { ParkingServices } from '../../core/services/parking/parking.service';
import { infoCities, infoParking } from '../../interfaces/Paqueaderos';
import { MapService, PlacesService } from '../maps/servicios';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NewsService } from '../../core/services/news/news.service';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [MapScreenComponent, SidebarComponent, SearchBarComponent, RouterModule],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css'
})
export class UserInterfaceComponent implements OnInit {
  public cities!: Array<infoCities>; 
  public parking!: Array<infoParking>;

  constructor(private parkingService: ParkingServices, private mapService: MapService, private placeService: PlacesService) {
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

  routePark(park: infoParking) {
    if(!this.placeService.useLocation) throw Error('No hay userLocation');
    const start=this.placeService.useLocation;
    const end = [park.longitud, park.latitud] as [number, number];

    this.mapService.getRouteBetweenPoints(start,end);
  }
}
