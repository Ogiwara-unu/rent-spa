import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';

export const routes: Routes = [
    {path:'',component:HomeComponent}, //PATH ES EL ELEMENTO QUE VA DESPUES DEL LOCALHOST:4200
    {path:'home',component:HomeComponent}, //AL PARECER EL ORDEN DE LAS RUTAS IMPORTA
    {path:'login',component:LoginComponent},
    {path:'signup',component:SingupComponent},
    {path:'catalog',component:CatalogComponent},
    {path:'tarjeta',component:TarjetaComponent},
    {path:'vehiculos',component:VehiculosComponent},
    {path:'cliente',component:ClienteComponent},
    {path:'add-user',component:AddUserComponent},
    {path:'add-vehicle',component:AddVehicleComponent},
    {path:'**',component:ErrorComponent},

]; 
