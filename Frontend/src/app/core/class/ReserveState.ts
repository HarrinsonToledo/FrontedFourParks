import { Injectable } from "@angular/core";
import { infoParking } from "../../interfaces/Paqueaderos";


@Injectable({
    providedIn: 'root'
})
export class ReserveState {
    private reservePark: infoParking = {
        codParqueadero: "string",
        nombre: "string",
        iEstado: "string",
        i24Hrs: "string",
        horaApertura: "string",
        horaCierre: "string",
        iFidelizacion: "string",
        direccion: "string",
        latitud: 0,
        longitud: 0,
        codGerente: "string",
        tipoParqueadero: "string",
        ciudad: "string",
        codTarifa: "string",
        numPuestos: 0
    };

    public showModalReserve: boolean = false;

    constructor() {

    }

    public getReservePark(): infoParking {
        return this.reservePark;
    }

    public setReservePark(rp: infoParking) {
        this.reservePark = rp;
    }
}