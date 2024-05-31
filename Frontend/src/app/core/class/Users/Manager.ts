import { Injectable } from "@angular/core";
import { UserDataService } from "../../services/userData/userdata.service";
import { InfoManager, InfoSendPassword } from "../../../interfaces/User";
import { ManagerServices } from "../../services/manager/manager.service";
import { InfoEditPark, infoParking } from "../../../interfaces/Parqueaderos";
import Notiflix from "notiflix";
import { ManagerState } from "../States/ManagerState";
import { Parking } from "../Objets/Parking";
import { InfoReportPark,  InfoReportCity } from "../../../interfaces/Reports";
import { AuthenticateService } from "../../services/autheticate/authenticate.service";

@Injectable({
    providedIn: 'root'
})
export class Manager {
    private infoData: InfoManager | undefined;
    private infoCalcCity:  InfoReportCity[] | undefined;
    private infoCalcPark: InfoReportPark[] | undefined;
    public seguroC: boolean = true;

    constructor(
        private userData: UserDataService,
        private managerService: ManagerServices,
        private managerState: ManagerState,
        private parks: Parking,
        private authen: AuthenticateService
    ) {

    }

    private resetReports() {
        this.infoCalcCity = undefined;
        this.seguroC = true;
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

    public changePassword(password: InfoSendPassword) {
        Notiflix.Loading.dots()
        this.managerService.updatePassword(password).subscribe({
          next: Response => {
            Notiflix.Loading.remove();
            Notiflix.Report.success('Contraseña cambiada', 'Su contraseña fue cambiada', 'ok')
            this.authen.deleteFirstSession();
          },
          error: Error => {
            Notiflix.Loading.remove();
            Notiflix.Report.success('Error', Error, 'ok')
          }
        })
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
                    this.resetReports();
                } else if (response.fail.length == 0) {
                    message = message + response.success.join(", ") + ' se modificaron';
                    Notiflix.Report.success('Modificaciones fueron exitosas', message, 'ok');
                    this.managerState.showModalEdit = false;
                    this.parks.seguroParks = true;
                    this.parks.resetParks();
                    this.resetReports();
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
                this.resetReports();
            },
            error: error => {
                Notiflix.Loading.remove()
                Notiflix.Report.failure('Error servidor', error, 'ok')
            }
        })
    }

    public getCalcCity():  InfoReportCity[] | undefined {
        return this.infoCalcCity;
    }

    public loadCalcCity(manager: string) {
        this.managerService.getCalcCity(manager).subscribe({
            next: response => {
                this.infoCalcCity = response;
            },
            error: error => {
                console.error(error);
            }
        })
    }

    public getCalcPark(): InfoReportPark[] | undefined {
        return this.infoCalcPark;
    }

    public loadCalcPark(park: string) {
        Notiflix.Loading.dots()
        this.managerService.getCalcPark(park).subscribe({
            next: response => {
                this.infoCalcPark = response;
                Notiflix.Loading.remove()
            },
            error: error => {
                Notiflix.Loading.remove()
                Notiflix.Notify.failure('Error al cargar la información', { timeout: 5000 });
                console.error(error);
            }
        })
    }
}