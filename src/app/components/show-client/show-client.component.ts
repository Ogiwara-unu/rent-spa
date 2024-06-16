import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { Licencia } from '../../models/licencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-client',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-client.component.html',
  styleUrl: './show-client.component.css',
  providers:[ClienteService]
})
export class ShowClientComponent {
  public status: number;
  public client: Cliente;
  public licencia:Licencia;
  public licencias:Licencia[];
  public filteredLicencias: Licencia[];
  public searchQuery: string = "";

  constructor(
    private _clientService:ClienteService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.client = new Cliente(0, "", "", "", "", "", "", "");
      this.licencia = new Licencia(0, 0, "", "", "");
      this.licencias = [];
      this.filteredLicencias = [];
      
    }

    ngOnInit() {
      this.loadClient();
    }

    loadClient() {
      this._routes.params.subscribe(
        params => {
          let idClient = params['id'];
          if (idClient) {
            this._clientService.show(idClient).subscribe(
              response => {
                if (response && response.Cliente) {
                  this.client = response.Cliente;
                  this.licencias = response.Cliente.licencia;
                  this.filteredLicencias = this.licencias;
                  console.log(this.client);
                } else {
                  this.showAlert('error', 'No se pudo cargar el usuario');
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

    searchLicenseById(): void {
      const query = parseInt(this.searchQuery);
      if (!isNaN(query)) {
        // Intentar encontrar la renta con el ID especificado
        const foundLicense = this.licencias.find(licencia => licencia.id === query);
    
        if (foundLicense) {
          this.licencia = foundLicense;
          this.filteredLicencias = [foundLicense];
        } else {
          this.filteredLicencias = this.licencias;
          this.showAlert('error', 'No se encontró la licencia');
        }
      } else {
        // Mostrar todas las rentas asociadas a this.card.id si está definido
        if (this.client.id) {
          this.filteredLicencias = this.licencias.filter(licencia => licencia.cliente_id === this.client.id);
        } else {
          // Si this.card.id no está definido, simplemente mostrar todas las rentas
          this.filteredLicencias = this.licencias;
        }
      }
    }

    onSubmit(form:any){}


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
      });
    }
}

