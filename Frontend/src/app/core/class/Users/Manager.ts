import { Injectable } from "@angular/core";
import { UserDataService } from "../../services/userData/userdata.service";
import { InfoManager } from "../../../interfaces/User";
import { ManagerServices } from "../../services/manager/manager.service";
import { InfoEditPark, infoParking } from "../../../interfaces/Parqueaderos";
import Notiflix from "notiflix";
import { ManagerState } from "../States/ManagerState";
import { Parking } from "../Objets/Parking";

@Injectable({
    providedIn: 'root'
})
export class Manager {
    private infoData: InfoManager | undefined;

    constructor(
        private userData: UserDataService,
        private managerService: ManagerServices,
        private managerState: ManagerState,
        private parks: Parking
    ) {

    }

    public loadManager(user: string) {
        this.userData.getManager(user).subscribe({
            next: response => {
                this.infoData = response;
            },
            error: error => {
                console.error(error);
            }
        })
    }

    public getInfo(): InfoManager | undefined {
        return this.infoData;
    }

    public editParks(info: InfoEditPark[]) {
        Notiflix.Loading.dots();
        let message = 'el(Los) parqueadero(s): ';
        this.managerService.editParks(info).subscribe({
            next: response => {
                Notiflix.Loading.remove()
                if (response.fail.length != 0 && response.success.length != 0) {
                    message = message + response.success.join(", ") + ' se modificaron';
                    message = 'y los parqueaderos: ' + message + response.fail.join(", ") + ' no se modificaron';
                    Notiflix.Report.warning('No todas las modificaiones fueron exitosas', message, 'ok');
                    this.managerState.showModalEdit = false;
                    this.parks.seguroParks = true;
                    this.parks.resetParks();
                } else if (response.fail.length == 0) {
                    message = message + response.success.join(", ") + ' se modificaron';
                    Notiflix.Report.success('Modificaciones fueron exitosas', message, 'ok');
                    this.managerState.showModalEdit = false;
                    this.parks.seguroParks = true;
                    this.parks.resetParks();
                } else if (response.success.length == 0) {
                    message = response.fail.join(", ");
                    Notiflix.Report.failure('Error de modificaciones', message, 'ok');
                }
            },
            error: error => {
                Notiflix.Loading.remove()
                Notiflix.Report.failure('Error servidor', error, 'ok')
            }
        })
    }

    public adminPark(info: infoParking) {
        Notiflix.Loading.dots();
        this.managerService.adminPark(info).subscribe({
            next: response => {
                Notiflix.Loading.remove()
                Notiflix.Report.success('Modificaciones fueron exitosas', 'se cambiaron los datos de CPK-' + info.codParqueadero, 'ok');
                this.managerState.showModalAdmin = false;
                this.parks.seguroParks = true;
                this.parks.resetParks();
            },
            error: error => {
                Notiflix.Loading.remove()
                Notiflix.Report.failure('Error servidor', error, 'ok')
            }
        })
    }
}