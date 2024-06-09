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
  providers: [RentaService, UserService, ClienteService, VehiculoService, TarjetaService]
})
export class AddRentComponent {
  public status: number;
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
  }

  get vehiculo_id(): number | null {
    return this._vehiculoId;
  }

  set vehiculo_id(value: number | null) {
    this._vehiculoId = value;
    this.updateTarifaBase();
  }

  onSubmit(form: any) {
    // Formatear las fechas al formato "yyyy-MM-dd"
    this.rent.fecha_entrega = this.formatDate(this.rent.fecha_entrega);
    this.rent.fecha_devolucion = this.formatDate(this.rent.fecha_devolucion);

    // this.rent.id = 3342; //AQUI ESTABA EL ERROR
    //EN EL BACKEND NO ES NECESARIO ESTABLECER EL USUARIO PQ ESTE LO ASIGNA AUTOMATICAMENTE
    //YO DE VOS PROBARIA QUITAR LA COSA DE ELEGIR USUARIO POR EL ID DE LA RENTA
    //PROBALO Y SI NO TE FUNCIONA PUES DEJA EL COSO DE USUARIO JASJA
    
    /*console.log("Registrando Renta ->" + this.rent.id);
    this.rent.id = parseInt(this.rent.id.toString());
    console.log("cliente ->" + this.rent.cliente_id);
    this.rent.cliente_id = parseInt(this.rent.cliente_id.toString());
    console.log("vehiculo ->" + this.rent.vehiculo_id);
    this.rent.vehiculo_id = parseInt(this.rent.vehiculo_id.toString());
    console.log("tarjeta ->" + this.rent.tarjeta_id);
    console.log("tarifa base ->" + this.rent.tarifa_base);
    this.rent.tarifa_base = parseInt(this.rent.tarifa_base.toString());
    console.log("fecha entrega ->" + this.rent.fecha_entrega);
    console.log("fecha devolucion ->" + this.rent.fecha_devolucion);
    console.log("total ->" + this.rent.total);
    this.rent.total = parseInt(this.rent.total.toString());
    console.log(this.rent);*/
    
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

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toISOString().split('T')[0];
  }

  updateTarifaBase() {
    if (this.rent.vehiculo_id) {
      // Se pasa estrictamente a string el valor que hay en rent.vehiculo_id para luego hacerlo int
      const vehiculoId = parseInt(this.rent.vehiculo_id.toString());
      console.log("Vehiculo seleccionado " + vehiculoId);
      // Busca el vehículo en la lista de vehículos
      const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === vehiculoId);

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
    const tarifaAdicionalPorDia = 10; // Puedes ajustar este valor según tus necesidades
    this.rent.total = this.rent.tarifa_base + (diferenciaDias * tarifaAdicionalPorDia);
  }

  updateTotalOnDateChange() {
    this.calculateTotalWithAdditionalCost();
    console.log(this.rent.total);
  }

  /* Rutas Clientes */
  navigateToCliente(): void {
    this._router.navigate(['/add-client']);
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
          console.log('Vehículos cargados:', this.vehicles);
          this.status = response.status;  // Llamada añadida aquí
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
