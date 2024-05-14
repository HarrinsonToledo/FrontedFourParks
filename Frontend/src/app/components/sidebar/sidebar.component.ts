import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateState } from '../../core/class/AuthenticateState';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements DoCheck {
  public w: string = 'w-20';
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

  constructor(private cookieService: CookieService, private root: Router, private authenticate: AuthenticateState) {
    if(cookieService.check('session')) {
      let cache = cookieService.get('session').split('|');
      this.user = cache[0];
    } else {
      root.navigate(['/'])
    }
  }

  ngDoCheck() {
    this.w = this.view ? 'min_oculy:w-80 w-40' : 'min_oculy:w-20 w-15';
    this.arrow = this.view ? 'arrowBar.png' : 'arrowBarInv.png';
    this.logoStyle = this.view ? 'w-3/5 my-10 rounded-xl mx-auto p-1 border-2 border-white' : 'w-12 my-10 rounded-full';
    this.logo = this.view ? 'LOGOBL.png' : 'LOGOLocation.png';
  }

  clearCookies() {
    this.authenticate.setIsLoginShow(false);
    this.cookieService.deleteAll();
  }
}