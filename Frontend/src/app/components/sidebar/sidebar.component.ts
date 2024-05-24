import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateState } from '../../core/class/States/AuthenticateState';
import { Customer } from '../../core/class/Users/Customer';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';
import { Parking } from '../../core/class/Objets/Parking';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements DoCheck {
  public w: string = 'w-20';
  public wimg: string = 'w-14';
  public view: boolean = false;
  public arrow: string = 'arrowBarInv.png';
  public location: string = 'Location IconWhite.png';
  public car: string = 'CarIcon.png';
  public histo: string = 'HistorialIcon.png';
  public data: string = 'DataIcon.png';
  public log: string = 'LogOutIcon.png';
  public logo: string = ''
  public logoStyle: string = 'w-16 h-16 my-10 rounded-full';

  public user!: string;

  constructor(
    private authenticaService: AuthenticateService, 
    private root: Router, 
    private authenticate: AuthenticateState,
    private customer: Customer,
    private parking: Parking
  ) {
    
  }

  ngOnInit() {
    if(this.authenticaService.isSession()) {
      this.user = this.authenticaService.getCookieSession()[0];
      this.customer.loadCustomer(this.user, true);
    } else {
      this.root.navigate(['/'])
    }
  }

  ngDoCheck() {
    this.w = this.view ? 'min_oculy:w-80 w-40' : 'min_oculy:w-20 w-15';
    this.wimg = this.view ? 'min_oculy:w-20 w-14':'w-14'
    this.arrow = this.view ? 'arrowBar.png' : 'arrowBarInv.png';
    this.logoStyle = this.view ? 'w-3/5 my-10 rounded-xl mx-auto p-1 border-2 border-white' : 'w-12 my-10 rounded-full';
    this.logo = this.view ? 'LOGOBL.png' : 'LOGOLocation.png';
  }

  clearCookies() {
    this.parking.clearReserves();
    this.customer.clearInfo();
    this.authenticate.setIsLoginShow(false);
    this.authenticaService.clearCookies();
  }
}
