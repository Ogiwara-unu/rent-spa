import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css',
  providers:[ClienteService]
})
export class UpdateClientComponent {
    public status: number;
    public client: Cliente;
    public upClient: Cliente;

    constructor(
      private _clientService: ClienteService,
      private _router: Router,
      private _routes: ActivatedRoute
    ){
      this.status= -1;
      this.client = new Cliente(0,"","","","","","","");
      this.upClient = new Cliente(0,"","","","","","","");
      this.loadClient();
    }

    onSubmit(form:any){
      if(form.valid){
        console.log('Actualizando cliente ->' + this.client.id);
        this.upClient.id = this.client.id;
        this.upClient.nombre = this.client.nombre;
        this.upClient.primer_apellido = this.client.primer_apellido;
        this.upClient.segundo_apellido = this.client.segundo_apellido;
        this.upClient.telefono = this.client.telefono;
        this.upClient.email = this.client.email;
        this.upClient.direccion = this.client.direccion;
        this.upClient.fecha_nacimiento = this.client.fecha_nacimiento;
        this._clientService.update(this.client.id , this.upClient).subscribe(
          response => {
            if (response && response.status === 200) {
              this.showAlertSuccess('success',response.message);
             } else {
               this.showAlert('error', 'No se pudo actualizar el Cliente');
             }
          },
          error => {
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      }else{
        this.showAlert('error','Formulario invalido jijiji');
      }
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
                } else {
                  this.showAlert('error', 'No se pudo cargar el Cliente');
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
          window.location.href = '/view-clients';
        }
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/view-clients';
        }
      });
    }
}
