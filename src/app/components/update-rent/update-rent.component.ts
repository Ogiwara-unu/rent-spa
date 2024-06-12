import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentaService } from '../../services/renta.service';
import { Renta } from '../../models/renta';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-rent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-rent.component.html',
  styleUrl: './update-rent.component.css',
  providers:[RentaService]
})
export class UpdateRentComponent {
  public status: number;
  public rent: Renta;
  public upRent: Renta;

  constructor(
    private _rentaService: RentaService,
    private _router: Router,
    private _routes: ActivatedRoute,
  ) {
    this.status = -1;
    this.rent = new Renta(1, 0, 0, 0, "", 0, "", "", 0);
    this.upRent = new Renta(1, 0, 0, 0, "", 0, "", "", 0);
    this.loadRent();
  }

  onSubmit(form:any){
    if(form.valid){
      console.log('Actualizando Renta ->' + this.rent.id);
      this.rent.fecha_entrega = this.formatDate(this.rent.fecha_entrega);
      this.rent.fecha_devolucion = this.formatDate(this.rent.fecha_devolucion);
      this.upRent.id = this.rent.id;
      this.upRent.cliente_id = this.rent.cliente_id;
      this.upRent.vehiculo_id = this.rent.vehiculo_id;
      this.upRent.tarjeta_id = this.rent.tarjeta_id;
      this.upRent.tarifa_base = this.rent.tarifa_base;
      this.upRent.fecha_entrega = this.rent.fecha_entrega;
      this.upRent.fecha_devolucion = this.rent.fecha_devolucion;
      this.upRent.total = this.rent.total;
      console.log(this.upRent);

      this._rentaService.update(this.rent.id , this.upRent).subscribe(
        response => {
          if (response && response.status === 200) {
            this.showAlertSuccess('success',response.message);
           } else {
             this.showAlert('error', 'No se pudo actualizar la renta');
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

  loadRent() {
    this._routes.params.subscribe(
      params => {
        let idRent = params['id'];
        if (idRent) {
          this._rentaService.show(idRent).subscribe(
            response => {
              if (response && response.Renta) {
                this.rent = response.Renta;
              } else {
                this.showAlert('error', 'No se pudo cargar el Renta');
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

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toISOString().split('T')[0];
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
        window.location.href = '/view-rents';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/view-rents';
      }
    });
  }
}
