import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
  providers: [ClienteService]
})
export class AddClientComponent {
  public status: number;
  public client: Cliente;
  private returnUrl: string | null = null;

  constructor(
    private _clientService: ClienteService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.client = new Cliente(0, "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.returnUrl = this._routes.snapshot.paramMap.get('returnUrl') || '/';
}

onSubmit(form: any) {
  console.log("Registrando Cliente :v ->" + this.client.nombre);
  this._clientService.store(this.client).subscribe({
      next: (response) => {
          if (response.status == 201) {
              form.reset();
              this.showAlert('success', response.message);
              this._router.navigate(['add-license']);
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
