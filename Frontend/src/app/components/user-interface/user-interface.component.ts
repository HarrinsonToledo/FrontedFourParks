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
  logo: string = ''
  logoStyle: string = 'w-16 h-16 my-10 rounded-full';

  constructor() {

  }

  ngDoCheck() {
    this.w = this.view ? 'w-3/12' : 'w-20';
    setTimeout(() => {
      this.arrow = this.view ? 'arrowBar.png' : 'arrowBarInv.png';
    this.logoStyle = this.view ? 'w-3/5 my-10 rounded-xl mx-auto p-1 border-2 border-white' : 'w-12 my-10 rounded-full';
    this.logo = this.view ? 'LOGOBL.png' : 'LOGOLocation.png';
    }, 300)
  }
}
