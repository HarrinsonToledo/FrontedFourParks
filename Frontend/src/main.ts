import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { enableProdMode } from '@angular/core';

Mapboxgl.accessToken = 'pk.eyJ1Ijoic2FudGlhZ29jYXNhbGxhcyIsImEiOiJjbHZyaW44Z2swb2RsMndvNjU5cnh1amVhIn0.m_1Nxk-4MIDzFNiGtdfdkA';

if (!navigator.geolocation) {
  alert('No soporta gps');
  throw new Error('No soporta gps');
}

if (environment.production){
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
