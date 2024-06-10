import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Licencia } from '../../models/licencia';
import { LicenciaService } from '../../services/licencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './licencia.component.html',
  styleUrl: './licencia.component.css',
  providers: [LicenciaService]
})
export class LicenciaComponent {
  public status: number;
  public license: Licencia;
  public selectedFile: File | null = null;

  constructor(
    private _licenseService: LicenciaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.license = new Licencia(1, 1, "", "", "");
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
    this._licenseService.store(this.license).subscribe({
      next: (response) => {
        if (response.status === 201) {
          form.reset();
          this.showAlert('success', response.message);
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.license.img = file.name; // Asignar el nombre del archivo al objeto vehicle
    }
  }

  showAlert(type: 'success' | 'error', message: string) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 4000,
      showConfirmButton: false
    });
  }
}
