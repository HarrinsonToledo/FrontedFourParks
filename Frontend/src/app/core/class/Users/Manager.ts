import { Injectable } from "@angular/core";
import { UserDataService } from "../../services/userData/userdata.service";
import { InfoManager } from "../../../interfaces/User";

@Injectable({
    providedIn: 'root'
})
export class Manager {
    private infoData: InfoManager | undefined;

    constructor(private userData: UserDataService) {

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
}