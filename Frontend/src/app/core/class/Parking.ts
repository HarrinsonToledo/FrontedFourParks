import { Injectable } from "@angular/core";
import { infoCities, infoParking } from "../../interfaces/Paqueaderos";
import { ParkingServices } from "../services/parking/parking.service";
import { MapService } from "../../components/maps/servicios";


@Injectable({
    providedIn: 'root'
})
export class Parking {
    private cities!: infoCities[];
    private parkings!: infoParking[];

    constructor(private parkingService: ParkingServices) {
        this.loadParkings()
        this.loadCities()
    } 

    public getCities(): infoCities[] {
        return this.cities;
    }

    public getParkings(): infoParking[] {
        return this.parkings;
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
}