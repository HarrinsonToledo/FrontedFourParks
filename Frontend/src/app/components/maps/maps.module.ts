import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { MapViewComponent } from './componentes/map-view/map-view.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { BtnMyLocationComponent } from './componentes/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from './componentes/search-bar/search-bar.component';
import { SearchResultsComponent } from './componentes/search-results/search-results.component';



@NgModule({
    imports: [
        CommonModule,
        MapScreenComponent,
        MapViewComponent,
        LoadingComponent,
        BtnMyLocationComponent,
        SearchBarComponent,
        SearchResultsComponent
    ],
    exports: [MapScreenComponent]
})
export class MapsModule { }
