import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../servicios';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrl: './map-view.component.css',
    standalone: true
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(
    private placeService: PlacesService,
    private mapService: MapService
  ) { }
  ngAfterViewInit(): void {
    if (!this.placeService.useLocation) throw Error('No hay placeservices.useLocation');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placeService.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });


    const popup = new Popup()
      .setHTML(`
  <h6>Ubicación actual</h6>
  <span>Estoy acá</span>`);

    new Marker({ color: 'red' })
      .setLngLat(this.placeService.useLocation)
      .setPopup(popup)
      .addTo(map)
      

      this.mapService.setMap(map);
  }
}



