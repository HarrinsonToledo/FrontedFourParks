import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent {
  public myReservations: Array<any> = Array(9).fill(1);

  constructor() {
    
  }
}
