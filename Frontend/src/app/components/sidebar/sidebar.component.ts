import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateState } from '../../core/class/States/AuthenticateState';
import { Customer } from '../../core/class/Users/Customer';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';
import { Parking } from '../../core/class/Objets/Parking';
import { Manager } from '../../core/class/Users/Manager';
import { Administrator } from '../../core/class/Users/Administrator';
import { ManagerPassComponent } from '../modals/manager-pass/manager-pass.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, ManagerPassComponent],
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
  
  public parametri: string = 'Recurso 21.png';
  public reports: string = 'DataIcon.png';

  public stadistics: string = 'Recurso 17.png';
  public usersData: string = 'Recurso 18.png';
  public trasabilidad: string = 'Recurso 19.png';
  public managerSign: string = 'DataIcon.png';

  public logo: string = '';
  public logoStyle: string = 'w-16 h-16 my-10 rounded-full';

  public user!: string;

  constructor(
    public authenticaService: AuthenticateService, 
    private root: Router, 
    private authenticate: AuthenticateState,
    private customer: Customer,
    public manager: Manager,
    private admin: Administrator,
    private parking: Parking
  ) {
    
  }

  ngOnInit() {
    if(this.authenticaService.isCustomer()) {
      this.user = this.authenticaService.getCookieSessionCustomer();
      if (this.customer.getInfo() == undefined) this.customer.loadCustomer(this.user, true);
    } else if(this.authenticaService.isManager()) {
      this.user = this.authenticaService.getCookieSessionManager();
      if (this.manager.getInfo() == undefined) this.manager.loadManager(this.user)
    } else if(this.authenticaService.isAdmin()) {
      this.user = this.authenticaService.getCookieSessionAdmin();
      if (this.admin.getInfo() == undefined) this.admin.loadAdministrator(this.user);
    }
    else {
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
    this.admin.reset();
    this.authenticate.setIsLoginShow(false);
    this.authenticaService.clearCookies();
  }
}
