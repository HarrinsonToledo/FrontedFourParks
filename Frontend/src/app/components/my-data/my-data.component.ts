import { Component, DoCheck, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { InfoCard, InfoDeleteCard, InfoUser } from '../../interfaces/User';
import { Customer } from '../../core/class/Users/Customer';
import { UpdateDataModalComponent } from '../modals/update-data-modal/update-data-modal.component';
import { AuthenticateService } from '../../core/services/autheticate/authenticate.service';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [SidebarComponent, UpdateDataModalComponent],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent implements DoCheck {
  public userData!: InfoUser;
  public cardsData!: Array<InfoCard>;
  public show: boolean[] = [this.customer.showUpdateData, this.customer.showUpdatePassword];

  constructor(
    public customer: Customer,
    private authe: AuthenticateService
  ) {
    
  }
  ngDoCheck() {
    if(this.customer.getInfo() == undefined && this.customer.seguroChange) {
      this.customer.loadCustomer(this.authe.getCookieSessionCustomer(), true);
      this.customer.seguroChange = false;
    } 
    this.userData = this.customer.getInfo()!;
    this.cardsData = this.customer.getCards()!;
    this.show = [this.customer.showUpdateData, this.customer.showUpdatePassword, this.customer.showAddCard];
  }

  deleteCard(id: string) {
    const info: InfoDeleteCard = {
      idCard: id
    }

    this.customer.deleteCard(info);
    this.customer.loadCards();
  }
}
