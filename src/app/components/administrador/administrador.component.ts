import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  constructor(
    private _router:Router,
    private _routes:ActivatedRoute
  ){

  }

  /* Rutas Usuario */
  navigateToAddUser(): void {
    this._router.navigate(['/add-user']);
  }

  navigateToviewUsers(): void {
    this._router.navigate(['/view-users']);
  }

  /* Rutas licencias */
  navigateTolicencias(): void {
    this._router.navigate(['/licencias']);
  }

  navigateToviewLicenses(): void {
    this._router.navigate(['/view-users']);
  }

  /* Rutas Clientes */
  navigateToCliente(): void {
    this._router.navigate(['/cliente']);
  }

  navigateToviewClients(): void {
    this._router.navigate(['/view-users']);
  }

  /* Rutas Vehiculo */
  navigateToAddVehicle(): void {
    this._router.navigate(['/add-vehicle']);
  }

  navigateToviewVehicles(): void {
    this._router.navigate(['/view-users']);
  }

  /* Rutas Tarjetas */
  navigateToAddCard(): void {
    this._router.navigate(['/add-card']);
  }

  navigateToviewCards(): void {
    this._router.navigate(['/view-users']);
  }

  /* Rutas Renta */
  navigateToAddRent(): void {
    this._router.navigate(['/add-card']);
  }

  navigateToviewRents(): void {
    this._router.navigate(['/view-users']);
  }

}
