import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarjeta } from '../../models/tarjeta';
import Swal from 'sweetalert2';
import { Renta } from '../../models/renta';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.css',
  providers:[TarjetaService]
})
export class ShowCardComponent {
  public status: number;
  public card:Tarjeta;
  public rents:Renta[];


  constructor(
    private _cardService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.card = new Tarjeta("","","","","");
    this.rents = [];
    this.loadCard();
  }

  loadCard() {
    this._routes.params.subscribe(
      params => {
        let cardId = params['id'];
        if (cardId) {
          this._cardService.show(cardId).subscribe(
            response => {
              if (response && response.Tarjeta) {
                this.card = response.Tarjeta;
                this.rents = response.Tarjeta.renta;
              } else {
                this.showAlert('error', 'No se pudo cargar la tarjeta');
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

  onSubmit(form:any){}

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
        window.location.href = '/view-cards';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/view-cards';
      }
    });
  }
}
