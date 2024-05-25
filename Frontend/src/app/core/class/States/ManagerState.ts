import { Injectable } from "@angular/core";
import { infoParking } from "../../../interfaces/Parqueaderos";

@Injectable({
    providedIn: 'root'
})
export class ManagerState {

    public showModalEdit : boolean = false;
    public showModalAdmin : boolean = false;

    private editParkAdmin!: infoParking;
    private editParksData!: infoParking[];

    constructor() {

    }

    public setEditParkAdmin(park: infoParking) {
        this.editParkAdmin = park;
    }

    public getEditParkAdmin(): infoParking {
        return this.editParkAdmin;
    }

    public setEditParksData(parks: infoParking[]) {
        this.editParksData = parks;
    }

    public getEditParksData(): infoParking[] {
        return this.editParksData;
    }
}