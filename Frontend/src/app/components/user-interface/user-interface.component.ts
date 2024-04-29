import { Component } from '@angular/core';

@Component({
  selector: 'app-user-interface',
  standalone: true,
  imports: [],
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.css'
})
export class UserInterfaceComponent {
  w: string = 'w-20';
  view: boolean = false;
  arrow: string = 'arrowBarInv.png';
  location: string = 'Location IconWhite.png';
  car: string = 'CarIcon.png';
  histo: string = 'HistorialIcon.png';
  data: string = 'DataIcon.png';
  log: string = 'LogOutIcon.png';

  constructor() {

  }

  ngDoCheck() {
    this.w = this.view ? 'w-3/12' : 'w-20';
    
    this.arrow = this.view ? 'arrowBar.png' : 'arrowBarInv.png';
  }
}
