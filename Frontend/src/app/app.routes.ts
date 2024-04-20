import { Routes } from '@angular/router';
import { PrincipalViewComponent } from './components/principal-view/principal-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';

export const routes: Routes = [
    {path: '', component: PrincipalViewComponent},
    {path: 'authentication', component: AuthenticateComponent}
];
