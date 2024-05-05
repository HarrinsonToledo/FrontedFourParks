import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../servicios';

@Component({
    selector: 'app-btn-my-location',
    templateUrl: './btn-my-location.component.html',
    styleUrl: './btn-my-location.component.css',
    standalone: true
})
export class BtnMyLocationComponent {
  constructor(
    private placesService:PlacesService,
    private mapService: MapService
  ) { }

  goToMyLocation(){
    if(!this.placesService.isUserLocationReady) throw Error('No hay ubicacion');
    if(!this.mapService.isMapReady) throw Error('No hay mapa');
    this.mapService.flyTo(this.placesService.useLocation!);
    

  }
}
