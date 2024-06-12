import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
  providers: [VehiculoService]
})
export class AddVehicleComponent {
  public status: number;
  public vehicle: Vehiculo;
  public selectedFile: File | null = null;

  constructor(
    private _vehicleService: VehiculoService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
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
    console.log('id ->' + this.vehicle.id);
    console.log('info general ->' + this.vehicle);
    this._vehicleService.store(this.vehicle).subscribe({
      next: (response) => {
        if (response.status === 201) {
          form.reset();
          this.showAlert('success', response.message);
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.vehicle.img = file.name; // Asignar el nombre del archivo al objeto vehicle
    }
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
