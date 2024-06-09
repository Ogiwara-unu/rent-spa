import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Licencia } from '../../models/licencia';
import { LicenciaService } from '../../services/licencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-license',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-license.component.html',
  styleUrl: './add-license.component.css',
  providers: [LicenciaService]
})
export class AddLicenseComponent {
  public status: number;
  public license: Licencia;
  private returnUrl: string | null = null;

  constructor(
    private _licenseService: LicenciaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.license = new Licencia(1, 1, "", "", "");
  }

  /*ngOnInit(): void {
    const clientId = this._routes.snapshot.paramMap.get('clientId');
    this.returnUrl = this._routes.snapshot.paramMap.get('returnUrl') || '/';
    
    if (clientId) {
        this.license.cliente_id = +clientId;
    }
}*/

onSubmit(form: any) {
  console.log("Registrando Licencia :v ->" + this.license.id);
  console.log(this.license);
  this._licenseService.store(this.license).subscribe({
      next: (response) => {
          if (response.status == 201) {
              form.reset();
              this.showAlert('success', response.message);
              this._router.navigate(['add-rent']);
          } else if (response.status == 406) {
              this.showAlert('error', 'Datos inválidos >:(');
          } else {
              this.showAlert('error', response.message);
          }
      },
      error: (error: Error) => {
          this.showAlert('error', 'Error del servidor');
      }
  });
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
