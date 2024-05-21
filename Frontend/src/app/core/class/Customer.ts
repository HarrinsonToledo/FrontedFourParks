import { Injectable } from "@angular/core";
import { InfoCard, InfoCardSend, InfoChangeUser, InfoDeleteCard, InfoSendPassword, InfoUser } from "../../interfaces/User";
import { AuthenticateService } from "../services/autheticate/authenticate.service";
import { UserDataService } from "../services/userData/userdata.service";
import Notiflix from "notiflix";


@Injectable({
  providedIn: 'root'
})
export class Customer {
  private info: InfoUser | undefined;
  private cards: InfoCard[] | undefined;
  public showUpdateData: boolean = false;
  public showUpdatePassword: boolean = false;
  public showAddCard: boolean = false;

  public isChangeDate: number = 0;
  public isAddCard: number = 0;
  public isChagePassword: number = 0;

  constructor(private userDataService: UserDataService, private autheticate: AuthenticateService) {
    this.loadCustomer(autheticate.getCookieSession()[0])
  }

  getCards(): InfoCard[] | undefined {
    return this.cards;
  }

  getInfo(): InfoUser | undefined {
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
    Notiflix.Loading.dots()
    this.userDataService.addCard(card).subscribe({
      next: Response => {
        this.isAddCard = 1;
        Notiflix.Loading.remove();
        Notiflix.Report.success('Tarjeta guardada', 'La tarjeta fue añadida con éxito', 'ok')
      },
      error: Error => {
        this.isAddCard = 2;
        Notiflix.Loading.remove();
        Notiflix.Report.success('Error', Error, 'ok')
      }
    })
  }

  changePassword(password: InfoSendPassword) {
    Notiflix.Loading.dots()
    this.userDataService.updatePassword(password).subscribe({
      next: Response => {
        this.isChagePassword = 1;
        Notiflix.Loading.remove();
        Notiflix.Report.success('Contraseña cambiada', 'Su contraseña fue cambiada', 'ok')
      },
      error: Error => {
        this.isChagePassword = 2;
        Notiflix.Loading.remove();
        Notiflix.Report.success('Error', Error, 'ok')
      }
    })
  }

  changeData(info: InfoChangeUser) {
    Notiflix.Loading.dots()
    this.userDataService.updateUser(info).subscribe({
      next: Response => {
        Notiflix.Loading.remove();
        Notiflix.Report.success('Información Guardada', 'Procedimiento completado', 'ok')
        this.isChangeDate = 1;
      },
      error: Error => {
        this.isChangeDate = 2;
        Notiflix.Loading.remove();
        Notiflix.Report.success('Error', Error, 'ok')
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
    this.userDataService.getCards(this.info!.K_NUM_DOCUMENTO, this.info!.I_TIPO_DOC).subscribe({
      next: Response => {
        this.cards = Response
      },
      error: Error => {
        console.log(Error)
      }
    })
  }

  clearInfo() {
    this.info = undefined;
    this.cards = undefined;
  }
}