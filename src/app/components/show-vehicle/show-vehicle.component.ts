import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../models/vehiculo';
import Swal from 'sweetalert2';
import { Renta } from '../../models/renta';

@Component({
  selector: 'app-show-vehicle',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-vehicle.component.html',
  styleUrl: './show-vehicle.component.css',
  providers:[VehiculoService]
})
export class ShowVehicleComponent {
  public status: number;
  public vehicle: Vehiculo;
  public rents:Renta[];

  constructor(
    private _vehicleService: VehiculoService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
    this.rents = [];
    this.loadVehicle();
  }

  onSubmit(form:any){}

  loadVehicle() {
    this._routes.params.subscribe(
      params => {
        let placaVehicle = params['placa'];
        console.log(placaVehicle)
        if (placaVehicle) {
          this._vehicleService.show(placaVehicle).subscribe(
            response => {
              if (response && response.Vehiculo) {
                console.log(response)
                this.vehicle = response.Vehiculo;
                this.rents = response.Vehiculo.renta;
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

  showAlert(type:'error', message: string) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 1000,
      showConfirmButton: false
    });
  }

  showAlertSuccess(type: 'success', message: string): void {
    Swal.fire({
      title: message,
      icon: type,
      timer: 2000,
      showConfirmButton: true,
      didClose: () => {
        window.location.href = '/view-vehicles';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/view-vehicles';
      }
    });
  }
}
