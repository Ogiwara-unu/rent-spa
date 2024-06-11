import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LicenciaService } from '../../services/licencia.service';
import { Licencia } from '../../models/licencia';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-license',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './update-license.component.html',
  styleUrl: './update-license.component.css',
  providers:[LicenciaService]
})
export class UpdateLicenseComponent {
  public status: number;
  public license: Licencia;
  public upLicense: Licencia;
  public selectedFile: File | null = null;

  constructor(
    private _licenseService: LicenciaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.license = new Licencia(1, 1, "", "", "");
    this.upLicense = new Licencia(1, 1, "", "", "");
    this.loadLicense();
  }

  onSubmit(form: any) {
    if (this.selectedFile) {
      console.log('img ->'+this.selectedFile);
      this._licenseService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.license.img = response.filename;
            this.saveLicense(form);
          } else {
            this.showAlert('error', 'Error al subir la imagen');
          }
        },
        error: (error: any) => {
          this.showAlert('error', 'Error del servidor');
        }
      });
    } else {
      this.saveLicense(form);
    }
  }

  saveLicense(form: any) {
    this.license.id = parseInt(this.license.id.toString());
    console.log('id ->' + this.license.id);
    console.log('info general ->' + this.license);
    this.upLicense.id = this.license.id;
    this.upLicense.cliente_id=this.license.cliente_id;
    this.upLicense.fecha_vencimiento = this.license.fecha_vencimiento;
    this.upLicense.tipo = this.license.tipo;
    this.upLicense.img = this.license.img;
    console.log('waerraa' + JSON.stringify(this.upLicense));
    this._licenseService.update(this.license.id,this.upLicense).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showAlertSuccess('success', response.message);
        } else if (response.status === 406) {
          this.showAlert('error', 'Datos inválidos >:(');
        } else {
          this.showAlert('error', response.message);
        }
      },
      error: (error: any) => {
        this.showAlert('error', 'Error del servidor');
      }
    });
  }

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.license.img = file.name; // Asignar el nombre del archivo al objeto vehicle
    }
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
