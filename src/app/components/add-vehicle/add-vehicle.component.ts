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
  styleUrls: ['./add-vehicle.component.css'],
  providers: [VehiculoService]
})
export class AddVehicleComponent {
  vehicle: Vehiculo = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");

  constructor(
    private _vehicleService: VehiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(form: any) {
    console.log("Registrando Vehiculo ->"+this.vehicle.img);
    this._vehicleService.store(this.vehicle).subscribe({
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
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
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
