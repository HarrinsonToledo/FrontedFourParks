import { Component, OnInit } from '@angular/core';
import { AuthenticateState } from '../../../core/class/States/AuthenticateState';
import { NarBarComponent } from '../../nar-bar/nar-bar.component';

@Component({
  selector: 'app-we-view',
  standalone: true,
  imports: [NarBarComponent],
  templateUrl: './we-view.component.html',
  styleUrl: './we-view.component.css'
})
export class WeViewComponent implements OnInit {
  constructor(private authenticate: AuthenticateState) {

  }

  ngOnInit()  {
    this.authenticate.setSignShow(false);
    this.authenticate.setIsLoginShow(false);
    this.authenticate.setLogShow(false);
  }
}
