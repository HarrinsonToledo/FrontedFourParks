import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-trasabilidad',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './trasabilidad.component.html',
  styleUrl: './trasabilidad.component.css'
})
export class TrasabilidadComponent {
  public parking: Array<any>=Array(10).fill(0); 
  constructor(){

  }
}
