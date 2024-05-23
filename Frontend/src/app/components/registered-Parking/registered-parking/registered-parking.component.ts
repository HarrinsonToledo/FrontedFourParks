import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';


@Component({
  selector: 'app-registered-parking',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './registered-parking.component.html',
  styleUrl: './registered-parking.component.css'
})
export class RegisteredParkingComponent {
  public parking: Array<any>=Array(10).fill(0); 
  constructor(){

  }

}
