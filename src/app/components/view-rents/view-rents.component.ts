import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RentaService } from '../../services/renta.service';
import { Renta } from '../../models/renta';

@Component({
  selector: 'app-view-rents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-rents.component.html',
  styleUrl: './view-rents.component.css',
  providers:[RentaService]
})
export class ViewRentsComponent {
  public status:number;
  public rent:Renta;
  public rents:Renta[];
  public filteredRents: Renta[];
  public searchQuery: string = "";

  constructor(
    private _rentService:RentaService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.rent = new Renta(0,0,0,0,"",0,"","",0);
      this.rents = [];
      this.filteredRents = [];
    }

    ngOnInit(): void {
      this.getRents();
    }

    navigateToAddRent(): void {
      this._router.navigate(['/add-rent']);
    }

    navigateToShow(id:any): void{
      this._router.navigate(['/show-rent/'+id]);
    }

    navigateToUpdate(id:any): void{
      this._router.navigate(['/update-rent/'+ id ]);
    }


    getRents() {
      this._rentService.getRents().subscribe(
        response => {
          if (response.status === 200) {
            this.rents = response.data;
            this.filteredRents = this.rents;
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

    searchRentById(): void {
      const query = parseInt(this.searchQuery);
      if (query) {
        this._rentService.show(query).subscribe(
          response => {
            if (response && response.Renta) {
              this.rent = response.Renta;
              this.filteredRents = [response.Renta];
            } else {
              this.filteredRents = [];
              this.showAlert('error', 'No se encontró la renta');
            }
          },
          error => {
            console.error('Error al buscar la renta:', error);
            this.filteredRents = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredRents = this.rents;
      }
    }

    confirmDelete(id: number) {
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
          this.destroyRent(id);
        }
      });
    }

    destroyRent(id: number) {
      console.log('Eliminando renta con id ->' + id);
      this._rentService.destroyRent(id).subscribe(
        response => {
          if (response.status === 200) {
            console.log('Renta eliminada con éxito.');
            this.rents = this.rents.filter(rent => rent.id !== id);
            Swal.fire(
              '¡Eliminado!',
              'La renta ha sido eliminada.',
              'success'
            );
          } else if (response.status === 400) {
            console.error('No se pudo eliminar la renta:', response.error);
            Swal.fire(
              'Error',
              'No se pudo eliminar la renta, compruebe que exista.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar la renta:', error);
          Swal.fire(
            'Error',
            'Hubo un error al eliminar la renta.',
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

}
