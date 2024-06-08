import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Renta } from '../../models/renta';
import { RentaService } from '../../services/renta.service';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-rent.component.html',
  styleUrl: './add-rent.component.css',
  providers: [RentaService,UserService,ClienteService,VehiculoService,TarjetaService]
})
export class AddRentComponent {
  public status: number;
  public rent: Renta;
  public users: any[] = [];
  public clients: any[] = [];
  public vehicles: any[] = [];
  public cards: any[] = [];
  
  constructor(
    private _rentaService: RentaService,
    private _userService: UserService,
    private _clienteService: ClienteService,
    private _vehiculoService: VehiculoService,
    private _tarjetaService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.rent = new Renta(1, 0, 0, 0, "", 0 , 0, 0, 0);
  }

  onSubmit(form: any) {
    console.log("Registrando Renta ->"+this.rent.id);
    this._rentaService.store(this.rent).subscribe({
      next: (response) => {
        if (response.status == 201) {
          form.reset();
          this.showAlert('success', response.message);
        } else if (response.status == 406) {
          this.showAlert('error', 'Datos inválidos >:(');
        } else {
          this.showAlert('error', response.message);
        }
      },
      error: (error: Error) => {
        this.showAlert('error', 'Error del servidor');
      }
    })
  }

  /* Rutas Clientes */
  navigateToCliente(): void {
    this._router.navigate(['/cliente']);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadClients();
    this.loadCards();
    this.loadVehicles();
  }

  loadUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.status === 200) {
          this.users = response.data;
          console.log(this.users);
          this.status = response.status;
        } else {
          this.status = response.status;
        }
      },
      error => {
        console.error(error);
        this.status = error.status;
      }
    );
  }

  loadClients() {
    this._clienteService.getClients().subscribe(
      response => {
        if (response.status === 200) {
          this.clients = response.data;
          console.log(this.clients);
          this.status = response.status;
        } else {
          this.status = response.status;
        }
      },
      error => {
        console.error(error);
        this.status = error.status;
      }
    );
  }

  loadVehicles() {
    this._vehiculoService.getVehicles().subscribe(
      response => {
        if (response.status === 200) {
          this.vehicles = response.data;
          console.log(this.vehicles);
          this.status = response.status;
        } else {
          this.status = response.status;
        }
      },
      error => {
        console.error(error);
        this.status = error.status;
      }
    );
  }

  loadCards() {
    this._tarjetaService.getCards().subscribe(
      response => {
        if (response.status === 200) {
          this.cards = response.data;
          console.log(this.cards);
          this.status = response.status;
        } else {
          this.status = response.status;
        }
      },
      error => {
        console.error(error);
        this.status = error.status;
      }
    );
  }

  showAlert(type: 'success' | 'error', message: string) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 4000,
      showConfirmButton: false
    });
  }

}
