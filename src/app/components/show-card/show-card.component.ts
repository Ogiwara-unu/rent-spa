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
  public rent:Renta;
  public rents:Renta[];
  public filteredRents: Renta[];
  public searchQuery: string = "";


  constructor(
    private _cardService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.card = new Tarjeta("","","","","");
    this.rent = new Renta(0,0,0,0,"",0,"","",0);
    this.rents = [];
    this.filteredRents = [];
  }

  ngOnInit() {
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
                this.filteredRents = this.rents;
                
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

  searchRentById(): void {
    const query = parseInt(this.searchQuery);
    if (!isNaN(query)) {
      // Intentar encontrar la renta con el ID especificado
      const foundRent = this.rents.find(rent => rent.id === query);
  
      if (foundRent) {
        this.rent = foundRent;
        this.filteredRents = [foundRent];
      } else {
        this.filteredRents = this.rents;
        this.showAlert('error', 'No se encontró la renta');
      }
    } else {
      // Mostrar todas las rentas asociadas a this.card.id si está definido
      if (this.card.id) {
        this.filteredRents = this.rents.filter(rent => rent.tarjeta_id === this.card.id);
      } else {
        // Si this.card.id no está definido, simplemente mostrar todas las rentas
        this.filteredRents = this.rents;
      }
    }
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
