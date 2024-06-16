import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LicenciaService } from '../../services/licencia.service';
import { Licencia } from '../../models/licencia';
import { ActivatedRoute, Router } from '@angular/router';
import { server } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-licenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-licenses.component.html',
  styleUrl: './view-licenses.component.css',
  providers:[LicenciaService]
})
export class ViewLicensesComponent {
  public status:number;
  public license:Licencia;
  public licenses:Licencia[];
  public filteredLicenses: Licencia[];
  public searchQuery: string = "";
  public url:string;

  constructor(
    private _licenseService:LicenciaService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.license = new Licencia(0, 0, "", "", "");
      this.licenses = [];
      this.filteredLicenses = [];
      this.url=server.url
    }

    ngOnInit(): void {
      this.getLicenses();
    }

    navigateToLicencia(): void {
      this._router.navigate(['/licencias']);
    }

    navigateToShow(id:any): void{
      this._router.navigate(['/show-license/'+id]);
    }

    navigateToUpdate(id:any): void{
      this._router.navigate(['/update-license/'+ id ]);
    }

    getLicenses() {
      this._licenseService.getLicenses().subscribe(
        response => {
          if (response.status === 200) {
            this.licenses = response.data;
            this.filteredLicenses = this.licenses;
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

    searchLicenseById(): void {
      const query = parseInt(this.searchQuery);
      if (query) {
        this._licenseService.show(query).subscribe(
          response => {
            if (response && response.Licencia) {
              this.license = response.Licencia;
              this.filteredLicenses = [response.Licencia];
            } else {
              this.filteredLicenses = [];
              this.showAlert('error', 'No se encontró la licencia');
            }
          },
          error => {
            console.error('Error al buscar la licencia:', error);
            this.filteredLicenses = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredLicenses = this.licenses;
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
          this.destroyLicense(id);
        }
      });
    }

    destroyLicense(id: number) {
      console.log('Eliminando licencia con id ->' + id);
      this._licenseService.destroyLicense(id).subscribe(
        response => {
          console.log(response);
          if (response.status === 200) {
            console.log('Licencia eliminada con éxito.');
            this.licenses = this.licenses.filter(license => license.id !== id);
            Swal.fire(
              '¡Eliminado!',
              'La licencia ha sido eliminada.',
              'success'
            );
          } else if (response.status === 400) {
            console.error('No se pudo eliminar la licencia:', response.message);
            Swal.fire(
              'Error',
              'No se pudo eliminar la licencia, compruebe que exista.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar la licencia:', error);
          Swal.fire(
            'Error',
            'Hubo un error al eliminar la licencia.',
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
