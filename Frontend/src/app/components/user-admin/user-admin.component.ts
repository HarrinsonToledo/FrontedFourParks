import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent {
  public parking: Array<any>=Array(3).fill(0); 
  constructor(){

  }
}
