import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../models/tarjeta';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-card.component.html',
  styleUrl: './update-card.component.css',
  providers:[TarjetaService]
})
export class UpdateCardComponent {
  public status: number;
  public card:Tarjeta;
  public upCard:Tarjeta;

  constructor(
    private _cardService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.card = new Tarjeta("","","","","");
    this.upCard = new Tarjeta("","","","","");
    this.loadCard();
  }

  onSubmit(form:any){
    if(form.valid){
      console.log('Actualizando tarejeta terminada en ->' + this.card.id);
      this.upCard.id = this.card.id;
      this.upCard.fecha_vencimiento = this.card.fecha_vencimiento;
      this._cardService.update(this.card.id , this.upCard).subscribe(
        response => {
          if (response && response.status === 200) {
            this.showAlertSuccess('success',response.message);
           } else {
             this.showAlert('error', 'No se pudo actualizar la tarjeta');
           }
        },
        error => {
          this.showAlert('error', 'Error en la solicitud');
        }
      );
    }else{
      this.showAlert('error','Formulario invalido');
    }
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
