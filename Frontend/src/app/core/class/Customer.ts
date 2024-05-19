import { Injectable } from "@angular/core";
import { InfoCard, InfoUser } from "../../interfaces/User";
import { ParkingServices } from "../services/parking/parking.service";


@Injectable({
    providedIn: 'root'
})
export class Customer {
    private info!: InfoUser;
    private cards!: InfoCard[];
    public showUpdateData: boolean = false; 
    public showUpdatePassword: boolean = false;

    constructor(private parkingService: ParkingServices) {

    }

    getCards(): InfoCard[] {
        return this.cards;
    }

    getInfo(): InfoUser {
        return this.info;
    }

    setCardNumber(card: string): string {
      const splitNumber: string[] = card.match(/.{1,4}/g) || []; 
      return splitNumber.join('-')
    }

    loadCustomer(user: string, exits?: boolean) {
        this.parkingService.getDataUser(user).subscribe({
          next: Response => {
            this.info = Response;
            this.parkingService.getCards(this.info.K_NUM_DOCUMENTO, this.info.I_TIPO_DOC).subscribe({
              next: Response => {
                if(exits) {
                    this.cards = Response;
                }
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