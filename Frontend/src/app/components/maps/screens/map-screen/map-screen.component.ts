import { Component } from '@angular/core';
import { PlacesService } from '../../servicios';
import { SearchBarComponent } from '../../componentes/search-bar/search-bar.component';
import { BtnMyLocationComponent } from '../../componentes/btn-my-location/btn-my-location.component';
import { MapViewComponent } from '../../componentes/map-view/map-view.component';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-map-screen',
    templateUrl: './map-screen.component.html',
    styleUrl: './map-screen.component.css',
    standalone: true,
    imports: [NgIf, LoadingComponent, MapViewComponent, BtnMyLocationComponent, SearchBarComponent]
})
export class MapScreenComponent {
  constructor(private placeService: PlacesService) { }

  get isUserLocationReady() {
    return this.placeService.isUserLocationReady;
  }
}
