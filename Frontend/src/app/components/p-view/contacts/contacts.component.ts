import { Component, OnInit } from '@angular/core';
import { NarBarComponent } from '../../nar-bar/nar-bar.component';
import { AuthenticateState } from '../../../core/class/States/AuthenticateState';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NarBarComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  public arroba: string = '@';
  constructor(private authenticate: AuthenticateState) {

  }

  ngOnInit()  {
    this.authenticate.setSignShow(false);
    this.authenticate.setIsLoginShow(false);
    this.authenticate.setLogShow(false);
  }
}
