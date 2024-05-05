import { Component } from '@angular/core';
import { PlacesService } from '../../servicios';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
    standalone: true,
    imports: [SearchResultsComponent]
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) {}

    onQueryChanged(query: string = ''){
      if(this.debounceTimer)clearTimeout(this.debounceTimer);
      this.debounceTimer=setTimeout(() => {
        this.placesService.getPlacesByquery(query);
      }, 350);
    }

  
}
