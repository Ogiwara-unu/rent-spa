import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo';
@Component({
  selector: 'app-view-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-vehicles.component.html',
  styleUrl: './view-vehicles.component.css',
  providers:[VehiculoService]
})
export class ViewVehiclesComponent {
  public status:number;
  public vehicle:Vehiculo;
  public vehicles:Vehiculo[];
  public filteredVehicles: Vehiculo[];
  public searchQuery: string = "";

  constructor(
    private _vehicleService:VehiculoService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
      this.vehicles = [];
      this.filteredVehicles = [];
    }

    ngOnInit(): void {
      this.getVehicles();
    }

    navigateToAddVehicle(): void {
      this._router.navigate(['/add-vehicle']);
    }

    navigateToShow(placa:any): void{
      this._router.navigate(['/show-vehicle/'+placa]);
    }

    navigateToUpdate(placa:any): void{
      this._router.navigate(['/update-vehicle/'+ placa ]);
    }


    getVehicles(){
      this._vehicleService.getCars().subscribe(
        response => {
          if (response.status === 200) {
            this.vehicles = response.data;
            this.filteredVehicles = this.vehicles;
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

    searchVehicleById(): void {
      const query = this.searchQuery;
      if (query) {
        this._vehicleService.show(query).subscribe(
          response => {
            if (response && response.Vehiculo) {
              this.vehicle = response.Vehiculo;
              this.filteredVehicles = [response.Vehiculo];
            } else {
              this.filteredVehicles = [];
              this.showAlert('error', 'No se encontró el Vehiculo');
            }
          },
          error => {
            console.error('Error al buscar el Vehiculo:', error);
            this.filteredVehicles = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredVehicles = this.vehicles;
      }
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
            this.showAlertSuccess('success',response.message);
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

    showAlert(type:'error', message: string) {
      Swal.fire({
        title: message,
        icon: type,
        timer: 1000,
        showConfirmButton: false
      });
    }

    showAlertSuccess(type:'success', message: string) {
      Swal.fire({
        title: message,
        icon: type,
        timer: 2000,
        showConfirmButton: true,
        didClose : () => {
          location.reload();
        }
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          location.reload();
        }
      });;
    }

}
