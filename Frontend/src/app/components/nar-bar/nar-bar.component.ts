import { Component, HostListener } from '@angular/core';
import { AuthenticateState } from '../../core/class/AuthenticateState';
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }

  ngDoCheck() {
    this.changeColorBG = this.autheticate.getIsLoginShow() ? 'bg-firtsColor min_oculy:bg-opacity-0 bg-opacity-30' : 'bg-firtsColor';
    this.changeColorTX = this.autheticate.getIsLoginShow() ?  'text-firtsColor' : 'text-white';
    this.changeBorder = this.autheticate.getIsLoginShow() ?  'hover:border-firtsColor' : 'hover:border-white';
  }

  narvarResponsive() {
    console.log(this.onResize())
  }
}
