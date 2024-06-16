import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-view-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.css',
  providers:[ClienteService]
})
export class ViewClientsComponent {
  public status:number;
  public client:Cliente;
  public clients:Cliente[];
  public filteredClients: Cliente[];
  public searchQuery: string = "";

  constructor(
    private _clientService:ClienteService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.client = new Cliente(0,"","","","","","","");
      this.clients = [];
      this.filteredClients = [];
    }

    ngOnInit(): void {
      this.getClients();
    }

    navigateToAddCliente(): void {
      this._router.navigate(['/cliente']);
    }

    navigateToShow(id:any): void{
      this._router.navigate(['/show-client/'+id]);
    }

    navigateToUpdate(id:any): void{
      this._router.navigate(['/update-client/'+ id ]);
    }

    getClients() {
      this._clientService.getClients().subscribe(
        response => {
          if (response.status === 200) {
            this.clients = response.data;
            this.filteredClients = this.clients;
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

    searchClientById(): void {
      const query = parseInt(this.searchQuery);
      if (query) {
        this._clientService.show(query).subscribe(
          response => {
            if (response && response.Cliente) {
              this.client = response.Cliente;
              this.filteredClients = [response.Cliente];
            } else {
              this.filteredClients = [];
              this.showAlert('error', 'No se encontró al cliente');
            }
          },
          error => {
            console.error('Error al buscar al cliente:', error);
            this.filteredClients = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredClients = this.clients;
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
        confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destroyClient(id);
        }
      });
    }

    destroyClient(id: number) {
      console.log('Eliminando cliente con id->' + id);
      this._clientService.destroyClient(id).subscribe(
        response => {
          if (response.status === 200) {
            console.log('Cliente eliminado con éxito.');
            this.clients = this.clients.filter(client => client.id !== id);
            Swal.fire(
              '¡Eliminado!',
              'El cliente ha sido eliminado.',
              'success'
            );
          } else if (response.status === 400) {
            console.error('No se pudo eliminar al cliente:', response.error);
            Swal.fire(
              'Error',
              'No se pudo eliminar al cliente.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar al cliente:', error);
          Swal.fire(
            'Error',
            'Error al eliminar Cliente.',
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
