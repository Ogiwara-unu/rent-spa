import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LicenciaComponent } from './components/licencia/licencia.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewCardsComponent } from './components/view-cards/view-cards.component';
import { ViewLicensesComponent } from './components/view-licenses/view-licenses.component';
import { ViewVehiclesComponent } from './components/view-vehicles/view-vehicles.component';
import { ViewRentsComponent } from './components/view-rents/view-rents.component';
import { AddRentComponent } from './components/add-rent/add-rent.component';

export const routes: Routes = [
    {path:'',component:HomeComponent}, //PATH ES EL ELEMENTO QUE VA DESPUES DEL LOCALHOST:4200
    {path:'home',component:HomeComponent}, //AL PARECER EL ORDEN DE LAS RUTAS IMPORTA EN LO QUE RESPECTA A LA DE ERROR
    {path:'login',component:LoginComponent},
    {path:'signup',component:SingupComponent},
    {path:'catalog',component:CatalogComponent},
    {path:'add-card',component:TarjetaComponent},
    {path:'cliente',component:ClienteComponent},
    {path:'add-user',component:AddUserComponent},
    {path:'add-vehicle',component:AddVehicleComponent},
    {path:'administrador',component:AdministradorComponent},
    {path:'licencias',component:LicenciaComponent},
    {path:'view-users',component:ViewUsersComponent},
    {path:'view-clients',component:ViewClientsComponent},
    {path:'view-cards',component:ViewCardsComponent},
    {path:'view-licenses',component:ViewLicensesComponent},
    {path:'view-vehicles',component:ViewVehiclesComponent},
    {path:'view-rents',component:ViewRentsComponent},
    {path:'add-rent',component:AddRentComponent},
    {path:'**',component:ErrorComponent},

]; 
