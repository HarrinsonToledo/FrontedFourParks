import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../servicios';
import { Feature } from '../../interfaces/places';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  standalone: true,
  imports: [NgIf, NgFor, NgClass]
})
export class SearchResultsComponent {
  public selectedId: string = "";

  constructor(private placesService: PlacesService,
    private mapService: MapService,
  ) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
    this.placesService.setPlaceSelected(place);
    this.placesService.places = [];
  }
}
