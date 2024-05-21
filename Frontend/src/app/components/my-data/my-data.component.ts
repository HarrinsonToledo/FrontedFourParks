import { Component, DoCheck, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { InfoCard, InfoDeleteCard, InfoUser } from '../../interfaces/User';
import { Customer } from '../../core/class/Customer';
import { UpdateDataModalComponent } from '../modals/update-data-modal/update-data-modal.component';

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
    public customer: Customer
  ) {
    
  }
  ngDoCheck() {
    if(this.userData == undefined || this.cardsData == undefined) {
      this.userData = this.customer.getInfo()!;
      this.cardsData = this.customer.getCards()!;
    }
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
