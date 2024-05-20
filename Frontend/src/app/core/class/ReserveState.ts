import { Injectable } from "@angular/core";
import { infoParking } from "../../interfaces/Paqueaderos";


@Injectable({
    providedIn: 'root'
})
export class ReserveState {
    private reservePark!: infoParking;
    private editReserve!: infoParking;
    private parkArrive!: infoParking;

    public showArriveModal: boolean = false;
    public showEditReserve: boolean = false;
    public showModalReserve: boolean = false;

    constructor() {

    }

    public getReservePark(): infoParking {
        return this.reservePark;
    }

    public setReservePark(rp: infoParking) {
        this.reservePark = rp;
    }

    public getEditReserve(): infoParking {
        return this.editReserve;
    }

    public setEditReserve(rp: infoParking) {
        this.editReserve = rp;
    }

    public getParkArrive(): infoParking {
        return this.parkArrive;
    }

    public setParkArrive(pa: infoParking) {
        this.parkArrive = pa;
    }
}