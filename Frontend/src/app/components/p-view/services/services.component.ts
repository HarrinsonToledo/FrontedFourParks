import { Component, OnInit } from '@angular/core';
import { AuthenticateState } from '../../../core/class/States/AuthenticateState';
import { NarBarComponent } from '../../nar-bar/nar-bar.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NarBarComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(private authenticate: AuthenticateState) {

  }

  ngOnInit()  {
    this.authenticate.setSignShow(false);
    this.authenticate.setIsLoginShow(false);
    this.authenticate.setLogShow(false);
  }
}
