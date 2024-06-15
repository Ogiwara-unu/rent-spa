import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LicenciaService } from '../../services/licencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Licencia } from '../../models/licencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-license',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './show-license.component.html',
  styleUrl: './show-license.component.css',
  providers:[LicenciaService]
})
export class ShowLicenseComponent {
  public status: number;
  public license: Licencia;

  constructor(
    private _licenseService: LicenciaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.license = new Licencia(1, 1, "", "", "");
    this.loadLicense();
  }

  onSubmit(form:any){}

  loadLicense() {
    this._routes.params.subscribe(
      params => {
        let idLicense = params['id'];
        if (idLicense) {
          this._licenseService.show(idLicense).subscribe(
            response => {
              if (response && response.Licencia) {
                this.license = response.Licencia;
              } else {
                this.showAlert('error', 'No se pudo cargar la Licencia');
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
        window.location.href = '/view-licenses';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/view-licenses';
      }
    });
  }
}
