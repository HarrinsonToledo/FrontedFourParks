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
  changeBorder!:string;

  img: string = '../../../assets/resources/Login icon.png';
  
  constructor(public authenticate: AuthenticateState) {
  }

  ngOnInit() {
    
  }

  over(e: boolean) {
    this.img = e ? '../../../assets/resources/Login icon.png' : '../../../assets/resources/Login iconWhite.png'
  }

  ngDoCheck() {
    this.changeColorBG = this.authenticate.getIsLoginShow() ? 'bg-firstColor min_oculy:bg-opacity-0 bg-opacity-30' : 'bg-firstColor';
    this.changeColorTX = this.authenticate.getIsLoginShow() ?  'text-firstColor' : 'text-white';
    this.changeBorder = this.authenticate.getIsLoginShow() ?  'hover:border-firstColor' : 'hover:border-white';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }

  goPrincipalView() {
    this.authenticate.setIsLoginShow(false);
    this.authenticate.setLogShow(false);
    this.authenticate.setSignShow(false);
  }

  goLogin() {
    this.authenticate.setIsLoginShow(true);
    this.authenticate.setLogShow(true);
    this.authenticate.setSignShow(false);
  }

  // ngDoCheck() {
  //   this.changeColorBG = this.authenticate.getIsLoginShow() ? 'bg-firstColor min_oculy:bg-opacity-0 bg-opacity-30' : 'bg-firstColor';
  //   this.changeColorTX = this.authenticate.getIsLoginShow() ?  'text-firstColor' : 'text-white';
  //   this.changeBorder = this.authenticate.getIsLoginShow() ?  'hover:border-firstColor' : 'hover:border-white';
  // }

  narvarResponsive() {
    console.log(this.onResize())
  }
}
