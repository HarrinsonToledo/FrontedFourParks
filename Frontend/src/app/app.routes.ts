import { Routes } from '@angular/router';
import { PrincipalViewComponent } from './components/principal-view/principal-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ServicesComponent } from './components/p-view/services/services.component';
import { WeViewComponent } from './components/p-view/we-view/we-view.component';
import { ContactsComponent } from './components/p-view/contacts/contacts.component';
import { RecordsComponent } from './components/records/records.component';
import { RegisteredParkingComponent } from './components/registered-Parking/registered-parking.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { TrasabilidadComponent } from './components/trasabilidad/trasabilidad.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { GenerateStatisticsComponent } from './components/generate-statistics/generate-statistics.component';

export const routes: Routes = [
    {path: '', component: PrincipalViewComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'us', component: WeViewComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'authentication', component: AuthenticateComponent},
    {path: 'userInterface', component: UserInterfaceComponent},
    {path: 'myReservations', component: MyReservationsComponent},
    {path: 'myData', component: MyDataComponent},
    {path: 'records', component: RecordsComponent},
    {path: 'registeredParking', component: RegisteredParkingComponent},
    {path: 'generateReport', component: GenerateReportComponent},
    {path: 'generateStatistics', component: GenerateStatisticsComponent},
    {path: 'userAdmin', component: UserAdminComponent},
    {path: 'trasabilidad', component: TrasabilidadComponent},
    {path: 'registerAdmin', component: RegisterAdminComponent}
];
