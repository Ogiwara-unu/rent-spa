import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarjeta } from '../../models/tarjeta';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
  providers:[TarjetaService]
})
export class TarjetaComponent {
  public status:number;
  public card:Tarjeta

  constructor(
    private _cardService:TarjetaService,
    private _router:Router,
    private _routes:ActivatedRoute
  ){
    this.status=-1;
    this.card = new Tarjeta("","","","","");
  }

  onSubmit(form: any) {
    console.log("Registrando Tarjeta con el titular :v ->" + this.card.titular);
    this._cardService.store(this.card).subscribe({
      next: (response) => {
        if (response.status == 201) {
          form.reset();
          this.showAlert('success', response.message);
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
