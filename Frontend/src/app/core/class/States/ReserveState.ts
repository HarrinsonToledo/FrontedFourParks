import { Injectable } from "@angular/core";
import { infoParking } from "../../../interfaces/Parqueaderos";
import { InfoReserveUser } from "../../../interfaces/Reserve";


@Injectable({
    providedIn: 'root'
})
export class ReserveState {
    private reservePark: infoParking | undefined;
    private editReserve!: InfoReserveUser;
    private parkArrive!: infoParking;

    public showArriveModal: boolean = false;
    public showEditReserve: boolean = false;
    public showModalReserve: boolean = false;

    public seguroReserves: boolean = true;

    constructor() {

    }

    public getReservePark(): infoParking | undefined {
        return this.reservePark;
    }

    public setReservePark(rp: infoParking) {
        this.reservePark = rp;
    }

    public getEditReserve(): InfoReserveUser {
        return this.editReserve;
    }

    public setEditReserve(rp: InfoReserveUser) {
        this.editReserve = rp;
    }

    public getParkArrive(): infoParking {
        return this.parkArrive;
    }

    public setParkArrive(pa: infoParking) {
        this.parkArrive = pa;
    }
}