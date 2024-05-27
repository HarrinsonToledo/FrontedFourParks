import { Injectable } from "@angular/core";
import { AdminService } from "../../services/admin/admin.service";

@Injectable({
    providedIn: 'root'
})
export class AdminState {
    public seguroUsers: boolean = true;

    constructor() {
        
    }
}