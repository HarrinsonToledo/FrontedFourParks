import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
  public parking: Array<any>=Array(10).fill(0); 
  constructor(){

  }
}
