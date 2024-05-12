import { Routes } from '@angular/router';
import { PrincipalViewComponent } from './components/principal-view/principal-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MyDataComponent } from './components/my-data/my-data.component';

export const routes: Routes = [
    {path: '', component: PrincipalViewComponent},
    {path: 'authentication', component: AuthenticateComponent},
    {path: 'userInterface', component: UserInterfaceComponent},
    {path: 'myReservations', component: MyReservationsComponent},
    {path: 'myData', component: MyDataComponent}
];
