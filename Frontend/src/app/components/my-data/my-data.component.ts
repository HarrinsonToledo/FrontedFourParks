import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ParkingServices } from '../../core/services/parking/parking.service';
import { CookieService } from 'ngx-cookie-service';
import { InfoCard, InfoUser } from '../../interfaces/User';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent implements OnInit {
  public userCookie: string = '';
  public userData!: InfoUser;
  public cardsData!: Array<InfoCard>;

  constructor(private parkingService: ParkingServices, private cookiesService: CookieService) {
    if (cookiesService.check('session')) {
      this.userCookie = cookiesService.get('session').split('|')[0];
    }
  }

  ngOnInit() {
    this.parkingService.getDataUser(this.userCookie).subscribe({
      next: Response => {
        this.userData = Response;
        this.parkingService.getCards(this.userData.K_NUM_DOCUMENTO, this.userData.I_TIPO_DOC).subscribe({
          next: Response => {
            this.cardsData = Response;
            console.log(this.cardsData)
          },
          error: Error => {
            console.log(Error)
          }
        })
      },
      error: Error => {
        console.log(Error)
      }
    })
  }
}
