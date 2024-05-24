import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-generate-statistics',
  standalone: true,
  imports: [SidebarComponent],
   templateUrl: './generate-statistics.component.html',
  styleUrl: './generate-statistics.component.css'
})
export class GenerateStatisticsComponent {

}
