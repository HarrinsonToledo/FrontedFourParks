import { Injectable } from "@angular/core";
import { UserDataService } from "../../services/userData/userdata.service";
import { InfoAdmin, InfoAdminUsers, SendManager, trasabilidad } from "../../../interfaces/User";
import { AdminService } from "../../services/admin/admin.service";
import { AdminState } from "../States/AdminState";
import Notiflix from "notiflix";
import { Parking } from "../Objets/Parking";
import { InfoReportCity } from "../../../interfaces/Reports";

@Injectable({
    providedIn: 'root'
})
export class Administrator {
    private infoData: InfoAdmin | undefined;
    private users: InfoAdminUsers[] | undefined;
    private trasabi: trasabilidad[] | undefined;
    private static: InfoReportCity[] | undefined;

    constructor(
        private userData: UserDataService, 
        private adminService: AdminService, 
        private adminState: AdminState,
        private parks: Parking
    ) {

    }

    public reset() {
        this.users = undefined;
        this.trasabi = undefined;
        this.static = undefined;
    }

    public loadAdministrator(user: string) {
        this.userData.getAdmin(user).subscribe({
            next: response => {
                this.infoData = response;
            },
            error: error => {
                console.error(error);
            }
        })
    }

    public getInfo(): InfoAdmin | undefined {
        return this.infoData;
    }

    public loadUsers() {
        this.adminService.getUsers().subscribe({
            next: response => {
                this.users = response;
            },
            error: error => {
                console.error(error)
            }
        })
    }

    public getUsers(): InfoAdminUsers[] | undefined {
        return this.users;
    }

    public resetUsers() {
        this.users = undefined;
        this.adminState.seguroUsers = true;
    }

    public unlockUser(user: string) {
        Notiflix.Loading.dots();
        this.adminService.unlockUser(user).subscribe({
            next: response => {
                Notiflix.Loading.remove();
                Notiflix.Report.success('Desbloquedo de usuario', response.response, 'ok');
                this.resetUsers();
            },
            error: error => {
                Notiflix.Loading.remove();
                Notiflix.Report.failure('Error Server', error, 'ok');
            }
        })
    }

    public sendManager(info: SendManager) {
        Notiflix.Loading.dots();
        this.adminService.sendManager(info).subscribe({
            next: response => {
                Notiflix.Loading.remove()
                Notiflix.Report.success('Registro de Gerente', 'El Gerente se registro con éxito' ,'ok');
                this.parks.resetParks()
                this.parks.seguroParks = true;
            },
            error: error => {
                Notiflix.Loading.remove()
                if (error.status == 400) {
                    Notiflix.Report.warning('Error al registrar', error.error.Response, 'ok')
                } else {
                    Notiflix.Report.failure('Error servidor', error, 'ok')
                }
            }
        })
    }

    public loadTrasabilidad() {
        this.adminService.getTrasabilidad().subscribe({
            next: response => {
                this.trasabi = response;
            },
            error: error => {
                console.error(error)
            }
        })
    }

    public getTrasabilidad(): trasabilidad[] | undefined {
        return this.trasabi;
    }

    public loadStadistics() {
        this.adminService.getStadistics().subscribe({
            next: response => {
                this.static = response;
            },
            error: error => {
                console.error(error)
            }
        })
    }

    public getStadistics(): InfoReportCity[] | undefined {
        return this.static
    }
}