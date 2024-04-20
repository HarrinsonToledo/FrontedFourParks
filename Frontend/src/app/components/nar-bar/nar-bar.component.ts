import { Component } from '@angular/core';
import { AuthenticateState } from '../../interfaces/AuthenticateState';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nar-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nar-bar.component.html',
  styleUrl: './nar-bar.component.css'
})
export class NarBarComponent {
  changeColorBG!: string;
  changeColorTX!: string;
  changeBorder!: string;
  
  constructor(public autheticate: AuthenticateState) {

  }

  ngDoCheck() {
    this.changeColorBG = this.autheticate.getIsLoginShow() ? '' : 'bg-firtsColor';
    this.changeColorTX = this.autheticate.getIsLoginShow() ?  'text-firtsColor' : 'text-white';
    this.changeBorder = this.autheticate.getIsLoginShow() ?  'hover:border-firtsColor' : 'hover:border-white';
  }
}
