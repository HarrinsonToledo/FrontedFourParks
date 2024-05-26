import { Injectable } from "@angular/core";
import { infoCities, infoParking, InfoGetFee } from "../../../interfaces/Parqueaderos";
import { ParkingServices } from "../../services/parking/parking.service";
import { InfoReserveUser, InfoSendReserve } from "../../../interfaces/Reserve";
import Notiflix from "notiflix";
import { ReserveState } from "../States/ReserveState";


@Injectable({
    providedIn: 'root'
})
export class Parking {
    private cities: infoCities[] | undefined;
    private parkings: infoParking[] | undefined;
    private fees: InfoGetFee | undefined;
    private allFees: InfoGetFee[] | undefined;
    private Reserves: InfoReserveUser[] | undefined;

    public seguroParks: boolean = true;

    constructor(private parkingService: ParkingServices, private reserveState: ReserveState) {

    } 

    public resetParks() {
        this.parkings = undefined;
        this.allFees = undefined;
    }

    public getFees(): InfoGetFee | undefined {
        return this.fees;
    }

    public getAllFees(): InfoGetFee[] | undefined {
        return this.allFees;
    }

    public sendReserve(info: InfoSendReserve, type: boolean) {
        Notiflix.Loading.dots()
        if(type) {
            this.parkingService.addReserve(info).subscribe({
                next: response => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.success('Reserva guardada con éxito', 'Tu código: ' + info.idReserva,'ok');
                    this.reserveState.showModalReserve = false;
                    this.reserveState.seguroReserves = true
                    this.Reserves = undefined;
                },
                error: error => {
                    Notiflix.Loading.remove()
                    if (error.status == 400) {
                        Notiflix.Report.warning('Error al reservar', error.error.Response, 'ok')
                    } else {
                        Notiflix.Report.failure('Error servidor', error, 'ok')
                    }
                }
            })
        } else {
            this.parkingService.updateReserve(info).subscribe({
                next: response => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.success('Reserva ' + info.idReserva + ' actualizada', 'Tu reserva fue actualizada con éxito','ok');
                    this.reserveState.showEditReserve = false;
                    this.reserveState.seguroReserves = true;
                    this.Reserves = undefined;
                },
                error: error => {
                    Notiflix.Loading.remove()
                    if (error.status == 400) {
                        Notiflix.Report.warning('error al actualizar tu reserva', error.error.Response,'ok');
                    } else {
                        Notiflix.Report.failure('Error servidor', error, 'ok')
                    }
                }
            })
        }
    }

    public deleteReserve(id: string) {
        Notiflix.Loading.dots()
        this.parkingService.deleteReserve(id).subscribe({
            next: response => {
                Notiflix.Loading.remove()
                Notiflix.Report.success('Reserva ' + id + ' eliminada', 'Tu reserva fue eliminada con éxito','ok');
                this.reserveState.showEditReserve = false;
                this.reserveState.seguroReserves = true;
                this.Reserves = undefined;
            },
            error: error => {
                Notiflix.Loading.remove()
                if (error.status == 400) {
                    Notiflix.Report.warning('error al eliminar la reserva', error.error.Response,'ok');
                } else {
                    Notiflix.Report.failure('Error servidor', error, 'ok')
                }
            }
        })
    }

    public getReserves(): InfoReserveUser[] | undefined {
        return this.Reserves;
    }

    public getCities(): infoCities[] | undefined {
        return this.cities;
    }

    public getParkings(): infoParking[] | undefined {
        return this.parkings;
    }

    public loadReserves(doc: number, typeDoc: string) {
        this.parkingService.getReserves(doc, typeDoc).subscribe({
            next: response => {
                this.Reserves = response;
            },
            error: error => {

            }
        })
    }    

    public loadFeePark(idFee: string) {
        this.parkingService.getFees(idFee).subscribe({
            next: response => {
                this.fees = response;
            },
            error: error => {
                console.error(error)
            }
        })
    }

    public loadAllFees() {
        this.parkingService.getAllFees().subscribe({
            next: response => {
                this.allFees = response;
            },
            error: error => {
                console.log(error)
            }
        })
    }

    public loadCities() {
        this.parkingService.getCities().subscribe({
            next: (response) => {
                this.cities = response;
            },
            error: (error) => { },
        });
    }

    public loadParkings() {
        this.parkingService.getParking().subscribe({
            next: (response) => {
                this.parkings = response;
            },
            error: (error) => { },
        });
    }

    clearReserves() {
        this.Reserves = undefined;
    }
}