import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ReserveState } from '../../../core/class/ReserveState';
import { MapScreenComponent } from '../../maps/screens/map-screen/map-screen.component';
import { MapService } from '../../maps/servicios/map.service';
import { PlacesService } from '../../maps/servicios/places.service';
import { infoParking } from '../../../interfaces/Paqueaderos';

@Component({
  selector: 'app-arrive-modal',
  standalone: true,
  imports: [MapScreenComponent],
  templateUrl: './arrive-modal.component.html',
  styleUrl: './arrive-modal.component.css'
})
export class ArriveModalComponent implements DoCheck {
  public seguro: boolean = true;
  constructor(
    public reserveState: ReserveState,
    private mapService: MapService,
    private placeService: PlacesService
  ) {

  }

  ngDoCheck(): void {
    this.marker()
  }

  marker() {
    if (this.placeService.isUserLocationReady && this.mapService.isMapReady && this.seguro) {
      if (!this.placeService.useLocation) throw Error('No hay userLocation');
      if (this.reserveState.getParkArrive() !== undefined) {
        this.flyTo(this.reserveState.getParkArrive())
        const start = this.placeService.useLocation;
        const end = [this.reserveState.getParkArrive().longitud, this.reserveState.getParkArrive().latitud] as [number, number];
   
        this.mapService.getRouteBetweenPointsArrive(start, end);
      }
      this.seguro = false;
    }
  }

  flyTo(park: infoParking) {
    const [lng, lat] = [park.longitud, park.latitud];
    this.mapService.flyTo([lng, lat]);
    this.mapService.createMarkersFromPark(park);
  }
}
