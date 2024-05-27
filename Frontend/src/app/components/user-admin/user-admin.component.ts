import { Component, DoCheck } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { InfoAdminUsers } from '../../interfaces/User';
import { Administrator } from '../../core/class/Users/Administrator';
import { AdminState } from '../../core/class/States/AdminState';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements DoCheck {
  public usersLock: InfoAdminUsers[] = [];
  public usersNormal: InfoAdminUsers[] = []; 

  public formManager!: FormControl;

  constructor(private admin: Administrator, private adminState: AdminState){

  }

  ngDoCheck(): void {
      if(this.admin.getUsers() == undefined && this.adminState.seguroUsers) {
        this.admin.loadUsers();
        this.adminState.seguroUsers = false
      }
      if(this.admin.getUsers() != undefined) {
        this.usersNormal = this.admin.getUsers()?.filter((u) => u.estado == 'A')!;
        this.usersLock = this.admin.getUsers()?.filter((u) => u.estado == 'B')!;
      }
  }

  unlock(user: InfoAdminUsers) {
    this.admin.unlockUser(user.user);
  }
}
