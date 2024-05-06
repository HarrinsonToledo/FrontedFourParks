import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { isPlatformBrowser } from '@angular/common';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  public placeSelect!: Feature;

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(private placesApi: PlacesApiClient, @Inject(PLATFORM_ID) private platformId: Object, private mapService: MapService) {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserLocation();
    }
  }

  public setPlaceSelected(place: Feature) {
    this.placeSelect = place;
    this.mapService.createMarkersFromPlaces([this.placeSelect])
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation)
        },
        (err) => {
          console.log(err);
        }
      );

    });
  }


  getPlacesByquery(query: string = '') {
    //evaluar query nulo
    if(query.length===0){
      this.places=[]
      this.isLoadingPlaces=false;
      return
    }
    if (!this.useLocation) throw Error('No hay user location');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
    query = '';
  }
}
