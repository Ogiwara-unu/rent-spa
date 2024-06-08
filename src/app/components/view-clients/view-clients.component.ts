import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-view-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.css',
  providers:[ClienteService]
})
export class ViewClientsComponent {
  public status:number;
  public client:Cliente;
  public clients:Cliente[];

  constructor(
    private _clientService:ClienteService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.client = new Cliente(0,"","","","","","","");
      this.clients = [];
    }

    ngOnInit(): void {
      this.getClients();
    }

    navigateToAddCliente(): void {
      this._router.navigate(['/cliente']);
    }

    getClients() {
      this._clientService.getClients().subscribe(
        response => {
          if (response.status === 200) {
            this.clients = response.data;
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
}
