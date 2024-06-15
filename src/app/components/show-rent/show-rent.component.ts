import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentaService } from '../../services/renta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Renta } from '../../models/renta';
import Swal from 'sweetalert2';
import { Vehiculo } from '../../models/vehiculo';
import { Tarjeta } from '../../models/tarjeta';
import { Cliente } from '../../models/cliente';
import { User } from '../../models/user';

@Component({
  selector: 'app-show-rent',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-rent.component.html',
  styleUrl: './show-rent.component.css',
  providers:[RentaService]
})
export class ShowRentComponent {
  public status: number;
  public rent: Renta;
  public vehicle:Vehiculo;
  public user:User;

 

  constructor(
    private _rentaService: RentaService,
    private _router: Router,
    private _routes: ActivatedRoute,
  ) {
    this.status = -1;
    this.rent = new Renta(1, 0, 0, 0, "", 0, "", "", 0);
    this.vehicle = new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
    this.user = new User(0, "", "", "", "");
    this.loadRent();
  }

  onSubmit(form:any){}

  loadRent() {
    this._routes.params.subscribe(
      params => {
        let idRent = params['id'];
        if (idRent) {
          this._rentaService.show(idRent).subscribe(
            response => {
              if (response && response.Renta) {
                this.rent = response.Renta;
                this.vehicle = response.Renta.vehiculo;
                this.user = response.Renta.user;
                console.log(this.rent)
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
