import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ManagerState {

    public showModalEdit : boolean = false;
    public showModalAdmin : boolean = false;

    constructor() {

    }
}