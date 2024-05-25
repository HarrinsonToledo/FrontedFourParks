import { Injectable } from "@angular/core";
import { UserDataService } from "../../services/userData/userdata.service";
import { InfoAdmin } from "../../../interfaces/User";

@Injectable({
    providedIn: 'root'
})
export class Administrator {
    private infoData: InfoAdmin | undefined;

    constructor(private userData: UserDataService) {

    }

    public loadAdministrator(user: string) {
        this.userData.getAdmin(user).subscribe({
            next: response => {
                this.infoData = response;
            },
            error: error => {
                console.error(error);
            }
        })
    }

    public getInfo(): InfoAdmin | undefined {
        return this.infoData;
    }
}