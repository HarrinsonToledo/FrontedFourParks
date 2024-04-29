import { Routes } from '@angular/router';
import { PrincipalViewComponent } from './components/principal-view/principal-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';

export const routes: Routes = [
    {path: 'a', component: PrincipalViewComponent},
    {path: 'authentication', component: AuthenticateComponent},
    {path: '', component: UserInterfaceComponent}
    // {path: 'userInterface', component: UserInterfaceComponent}
];
