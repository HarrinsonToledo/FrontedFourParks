import { Injectable } from "@angular/core";
import { InfoCard, InfoCardSend, InfoChangeUser, InfoDeleteCard, InfoSendPassword, InfoUser } from "../../interfaces/User";
import { AuthenticateService } from "../services/autheticate/authenticate.service";
import { UserDataService } from "../services/userData/userdata.service";


@Injectable({
  providedIn: 'root'
})
export class Customer {
  private info!: InfoUser;
  private cards!: InfoCard[];
  public showUpdateData: boolean = false;
  public showUpdatePassword: boolean = false;
  public showAddCard: boolean = false;

  public isChangeDate: number = 0;
  public isAddCard: number = 0;
  public isChagePassword: number = 0;

  constructor(private userDataService: UserDataService, private AutheServices: AuthenticateService) {

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

  deleteCard(card: InfoDeleteCard) {
    this.userDataService.deleteCard(card).subscribe();
  }

  saveCard(card: InfoCardSend) {
    this.userDataService.addCard(card).subscribe({
      next: Response => {
        this.isAddCard = 1;
      },
      error: Error => {
        this.isAddCard = 2;
      }
    })
  }

  changePassword(password: InfoSendPassword) {
    this.userDataService.updatePassword(password).subscribe({
      next: Response => {
        this.isChagePassword = 1;
      },
      error: Error => {
        this.isChagePassword = 2;
      }
    })
  }

  async changeData(info: InfoChangeUser) {
    this.userDataService.updateUser(info).subscribe({
      next: Response => {
        this.isChangeDate = 1;
      },
      error: Error => {
        this.isChangeDate = 2;
      }
    })
  }

  loadCustomer(user: string, exits?: boolean) {
    this.userDataService.getDataUser(user).subscribe({
      next: Response => {
        this.info = Response;
        if (exits) {
          this.loadCards();
        }
      },
      error: Error => {
        console.log(Error)
      }
    })
  }

  loadCards() {
    this.userDataService.getCards(this.info.K_NUM_DOCUMENTO, this.info.I_TIPO_DOC).subscribe({
      next: Response => {
        this.cards = Response
      },
      error: Error => {
        console.log(Error)
      }
    })
  }
}