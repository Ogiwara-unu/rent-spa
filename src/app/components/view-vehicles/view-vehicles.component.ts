import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo';
@Component({
  selector: 'app-view-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-vehicles.component.html',
  styleUrl: './view-vehicles.component.css',
  providers:[VehiculoService]
})
export class ViewVehiclesComponent {
  public status:number;
  public vehicle:Vehiculo;
  public vehicles:Vehiculo[];

  constructor(
    private _vehicleService:VehiculoService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
      this.vehicles = [];
    }

    ngOnInit(): void {
      this.getVehicles();
    }

    navigateToAddVehicle(): void {
      this._router.navigate(['/add-vehicle']);
    }

    getVehicles(){
      this._vehicleService.getCars().subscribe(
        response => {
          if (response.status === 200) {
            this.vehicles = response.data;
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

    confirmDelete(placa: string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar unu'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destroyVehicle(placa);
        }
      });
    }

    destroyVehicle(placa: string) {
      console.log('Eliminando vehiculo con placa ->' + placa);
      this._vehicleService.destroyVehicle(placa).subscribe(
        response => {
          if (response.status === 200) {
            console.log('Vehiculo eliminado con éxito.');
            this.vehicles = this.vehicles.filter(vehicle => vehicle.placa !== placa);
            Swal.fire(
              '¡Eliminado!',
              'El vehiculo se ha sido eliminado.',
              'success'
            );
          } else if (response.status === 400) {
            console.error('No se pudo eliminar el vehiculo:', response.error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el vehiculo, compruebe que exista.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar el vehiculo:', error);
          Swal.fire(
            'Error',
            'Hubo un error al eliminar el vehiculo.',
            'error'
          );
        }
      );
    }

}
