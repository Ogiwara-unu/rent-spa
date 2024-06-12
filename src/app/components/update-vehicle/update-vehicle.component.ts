import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-vehicle.component.html',
  styleUrl: './update-vehicle.component.css',
  providers:[VehiculoService]
})
export class UpdateVehicleComponent {
  public status: number;
  public vehicle: Vehiculo;
  public upVehicle: Vehiculo;
  public selectedFile: File | null = null;

  constructor(
    private _vehicleService: VehiculoService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
    this.upVehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
    this.loadVehicle();
  }

  onSubmit(form: any) {
    if (this.selectedFile) {
      console.log('img ->'+this.selectedFile);
      this._vehicleService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.vehicle.img = response.filename;
            this.saveVehicle(form);
          } else {
            this.showAlert('error', 'Error al subir la imagen');
          }
        },
        error: (error: any) => {
          this.showAlert('error', 'Error del servidor');
        }
      });
    } else {
      this.saveVehicle(form);
    }
  }

  saveVehicle(form: any) {
    this.vehicle.id = parseInt(this.vehicle.id.toString());
    this.upVehicle.id = this.vehicle.id;
    this.upVehicle.placa = this.vehicle.placa;
    this.upVehicle.marca = this.vehicle.marca;
    this.upVehicle.modelo = this.vehicle.modelo;
    this.upVehicle.transmision = this.vehicle.transmision;
    this.upVehicle.precio = this.vehicle.precio;
    this.upVehicle.kilometraje = this.vehicle.kilometraje;
    this.upVehicle.anio = this.vehicle.anio;
    this.upVehicle.estado = this.vehicle.estado;
    this.upVehicle.img = this.vehicle.img;
    this._vehicleService.update(this.vehicle.placa,this.upVehicle).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showAlertSuccess('success', response.message);
        } else if (response.status === 406) {
          this.showAlert('error', 'Datos inválidos >:(');
        } else {
          this.showAlert('error', response.message);
        }
      },
      error: (error: any) => {
        this.showAlert('error', 'Error del servidor');
      }
    });
  }


  loadVehicle() {
    this._routes.params.subscribe(
      params => {
        let placaVehicle = params['placa'];
        if (placaVehicle) {
          this._vehicleService.show(placaVehicle).subscribe(
            response => {
              if (response && response.Vehiculo) {
                this.vehicle = response.Vehiculo;
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.vehicle.img = file.name; // Asignar el nombre del archivo al objeto vehicle
    }
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
