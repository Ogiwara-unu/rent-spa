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
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddLicenseComponent } from './components/add-license/add-license.component';
import { ShowCardComponent } from './components/show-card/show-card.component';
import { ShowClientComponent } from './components/show-client/show-client.component';
import { ShowLicenseComponent } from './components/show-license/show-license.component';
import { ShowRentComponent } from './components/show-rent/show-rent.component';
import { ShowUserComponent } from './components/show-user/show-user.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { UpdateLicenseComponent } from './components/update-license/update-license.component';
import { UpdateRentComponent } from './components/update-rent/update-rent.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';
import { ShowVehicleComponent } from './components/show-vehicle/show-vehicle.component';

export const routes: Routes = [
    {path:'',component:HomeComponent}, //PATH ES EL ELEMENTO QUE VA DESPUES DEL LOCALHOST:4200
    {path:'home',component:HomeComponent}, //AL PARECER EL ORDEN DE LAS RUTAS IMPORTA EN LO QUE RESPECTA A LA DE ERROR
    {path:'login',component:LoginComponent},
    {path:'signup',component:SingupComponent},
    {path:'catalog',component:CatalogComponent},
    /**  RUTAS DE AGREGAR ENTIDADES */
    {path:'add-card',component:TarjetaComponent},
    {path:'cliente',component:ClienteComponent},
    {path:'add-user',component:AddUserComponent},
    {path:'add-vehicle',component:AddVehicleComponent},
    {path:'administrador',component:AdministradorComponent},
    {path:'licencias',component:LicenciaComponent},
     /**  RUTAS DE VISTA DE TODAS ENTIDADES */
    {path:'view-users',component:ViewUsersComponent},
    {path:'view-clients',component:ViewClientsComponent},
    {path:'view-cards',component:ViewCardsComponent},
    {path:'view-licenses',component:ViewLicensesComponent},
    {path:'view-vehicles',component:ViewVehiclesComponent},
    {path:'view-rents',component:ViewRentsComponent},
    {path:'add-rent',component:AddRentComponent},
    {path:'add-client',component:AddClientComponent},
    {path:'add-license',component:AddLicenseComponent},
      /**  RUTAS DE VISTA DE UNA SOLA ENTIDAD */
    {path:'show-card/:id',component:ShowCardComponent},
    {path:'show-client/:id',component:ShowClientComponent},
    {path:'show-license/:id',component:ShowLicenseComponent},
    {path:'show-rent/:id',component:ShowRentComponent},
    {path:'show-user/:email',component:ShowUserComponent},
    {path:'show-vehicle/:placa',component:ShowVehicleComponent},
         /**  RUTAS DE UPDATE*/
    {path:'update-card/:id',component:UpdateCardComponent},
    {path:'update-client/:id',component:UpdateClientComponent},
    {path:'update-license/:id',component:UpdateLicenseComponent},
    {path:'update-rent/:id',component:UpdateRentComponent},
    {path:'update-user/:email',component:UpdateUserComponent},
    {path:'update-vehicle/:placa',component:UpdateVehicleComponent},
    {path:'**',component:ErrorComponent}

]; 
