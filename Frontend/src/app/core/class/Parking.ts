import { Injectable } from "@angular/core";
import { infoCities, infoParking } from "../../interfaces/Parqueaderos";
import { ParkingServices } from "../services/parking/parking.service";
import { InfoGetFee, InfoReserveUser, InfoSendReserve } from "../../interfaces/Reserve";
import Notiflix from "notiflix";
import { ReserveState } from "./ReserveState";


@Injectable({
    providedIn: 'root'
})
export class Parking {
    private cities: infoCities[] | undefined;
    private parkings: infoParking[] | undefined;
    private fees!: InfoGetFee;
    private Reserves: InfoReserveUser[] | undefined;

    constructor(private parkingService: ParkingServices, private reserveState: ReserveState) {
        this.loadParkings();
        this.loadCities();
    } 

    public getFees(): InfoGetFee {
        return this.fees;
    }

    public sendReserve(info: InfoSendReserve, type: boolean) {
        Notiflix.Loading.dots()
        if(type) {
            this.parkingService.addReserve(info).subscribe({
                next: Response => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.success('Reserva guardada con éxito', 'Tu código: ' + info.idReserva,'ok');
                    this.reserveState.showModalReserve = false;
                    this.Reserves = undefined;
                },
                error: Error => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.failure('Error al guardar tu reserva', Error,'ok');
                }
            })
        } else {
            this.parkingService.updateReserve(info).subscribe({
                next: Response => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.success('Reserva ' + info.idReserva + ' actualizada', 'Tu reserva fue actualizada con éxito','ok');
                    this.reserveState.showEditReserve = false;
                    this.reserveState.seguroReserves = true;
                    this.Reserves = undefined;
                },
                error: Error => {
                    Notiflix.Loading.remove()
                    Notiflix.Report.failure('Error al actualizar tu reserva', Error,'ok');
                }
            })
        }
    }

    public deleteReserve(id: string) {
        Notiflix.Loading.dots()
        this.parkingService.deleteReserve(id).subscribe({
            next: Response => {
                Notiflix.Loading.remove()
                Notiflix.Report.success('Reserva ' + id + ' eliminada', 'Tu reserva fue eliminada con éxito','ok');
                this.reserveState.showEditReserve = false;
                this.reserveState.seguroReserves = true;
                this.Reserves = undefined;
            },
            error: Error => {
                Notiflix.Loading.remove()
                Notiflix.Report.failure('Error al eliminar la reserva', Error,'ok');
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
            next: Response => {
                this.Reserves = Response;
            },
            error: Error => {

            }
        })
    }    

    public loadFeePark(idFee: string) {
        this.parkingService.getFees(idFee).subscribe({
            next: Response => {
                this.fees = Response;
            },
            error: Error => {
                console.error(Error)
            }
        })
    }

    public loadCities() {
        this.parkingService.getCities().subscribe({
            next: (Response) => {
                this.cities = Response;
            },
            error: (Error) => { },
        });
    }

    public loadParkings() {
        this.parkingService.getParking().subscribe({
            next: (Response) => {
                this.parkings = Response;
            },
            error: (Error) => { },
        });
    }

    clearReserves() {
        this.Reserves = undefined;
    }
}