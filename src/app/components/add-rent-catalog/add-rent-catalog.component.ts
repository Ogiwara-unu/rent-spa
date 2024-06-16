import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { RentaService } from '../../services/renta.service';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Renta } from '../../models/renta';
import Swal from 'sweetalert2';
import { Vehiculo } from '../../models/vehiculo';

@Component({
  selector: 'app-add-rent-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-rent-catalog.component.html',
  styleUrls: ['./add-rent-catalog.component.css'],
  providers: [VehiculoService]
})
export class AddRentCatalogComponent {
  public status: number;
  public vehicle: Vehiculo;
  public rent: Renta;
  public users: any[] = [];
  public clients: any[] = [];
  public vehicles: any[] = [];
  public cards: any[] = [];

  private _vehiculoId: number | null = null;

  constructor(
    private _rentaService: RentaService,
    private _userService: UserService,
    private _clienteService: ClienteService,
    private _vehiculoService: VehiculoService,
    private _tarjetaService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute,
  ) {
    this.status = -1;
    this.rent = new Renta(1, 0, 0, 0, "", 0, "", "", 0);
    this.vehicle = new Vehiculo(0, "", "", "", "", 0, 0, "", "", "");
    this.loadVehicle();
  }

  get vehiculo_id(): number | null {
    return this._vehiculoId;
  }

  set vehiculo_id(value: number | null) {
    this._vehiculoId = value;
    this.updateTarifaBase();
  }

  onSubmit(form: any) {
    this.rent.fecha_entrega = this.formatDate(this.rent.fecha_entrega);
    this.rent.fecha_devolucion = this.formatDate(this.rent.fecha_devolucion);

    this._rentaService.store(this.rent).subscribe({
      next: (response) => {
        if (response.status == 201) {
          form.reset();
          this.showAlertSuccess('success', response.message);
        } else if (response.status == 406) {
          this.showAlert('error', 'Datos inválidos >:(');
        }
      },
      error: (error: Error) => {
        this.showAlert('error', 'Ha ocurrido un error en la solicitud');
        console.log(error);
      }
    })
  }

  loadVehicle() {
    this._routes.params.subscribe(
      params => {
        let placaVehicle = params['placa'];
        if (placaVehicle) {
          this._vehiculoService.show(placaVehicle).subscribe(
            response => {
              if (response && response.Vehiculo) {
                this.vehicle = response.Vehiculo;
                this.updateTarifaBase(); // Llamar aquí para asegurar la actualización
              } else {
                this.showAlert('error', 'No se pudo cargar el Vehiculo');
              }
            },
            error => {
              this.showAlert('error', 'Error en la solicitud');
            }
          );
        }
      }
    );
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toISOString().split('T')[0];
  }

  updateTarifaBase() {
    if (this.vehicle) {
      const vehiculoId = this.vehicle.id;
      console.log("Vehiculo seleccionado " + vehiculoId);
      const selectedVehicle = this.vehicle;

      if (selectedVehicle) {
        this.rent.tarifa_base = selectedVehicle.precio;
        this.rent.vehiculo_id = vehiculoId;
        console.log(this.rent.vehiculo_id);
        console.log('Tarifa base actualizada:', this.rent.tarifa_base);
      } else {
        console.log('Vehículo no encontrado en la lista de vehículos.');
      }
    } else {
      console.log('ID de vehículo no válido.');
    }
  }

  onCardSelect() {
    console.log('Tarjeta seleccionada:', this.rent.tarjeta_id);
  }

  onIdRentSelect() {
    console.log('ID seleccionado:', this.rent.id);
    const rent_id = parseInt(this.rent.id.toString());
    this.rent.id = rent_id;
    console.log(this.rent.id);
  }

  onClientSelect() {
    console.log('Cliente seleccionado:', this.rent.cliente_id);
    const cliente_id = parseInt(this.rent.cliente_id.toString());
    this.rent.cliente_id = cliente_id;
    console.log(this.rent.cliente_id);
  }

  calculateTotalWithAdditionalCost() {
    const fechaEntrega = new Date(this.rent.fecha_entrega);
    const fechaDevolucion = new Date(this.rent.fecha_devolucion);
    const diferenciaDias = Math.floor((fechaDevolucion.getTime() - fechaEntrega.getTime()) / (1000 * 3600 * 24));
    const tarifaAdicionalPorDia = 30;
    this.rent.total = this.rent.tarifa_base + (diferenciaDias * tarifaAdicionalPorDia);
  }

  updateTotalOnDateChange() {
    this.calculateTotalWithAdditionalCost();
    console.log(this.rent.total);
  }

  navigateToCliente(): void {
    this._router.navigate(['/add-client']);
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadCards();
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

  showAlert(type:'error', message: any) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 4000,
      showConfirmButton: false
    });
  }

  showAlertSuccess(type: 'success', message: any) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 3000,
      showConfirmButton: true,
      didClose: () => {
        window.location.href = '/catalog';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/catalog';
      }
    });
  }
}
