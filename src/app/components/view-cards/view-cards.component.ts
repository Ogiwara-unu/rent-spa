import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../models/tarjeta';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-cards.component.html',
  styleUrl: './view-cards.component.css',
  providers:[TarjetaService]
})
export class ViewCardsComponent {
  public status: number;
  public card: Tarjeta;
  public cards: Tarjeta[];
  public filteredCards: Tarjeta[];
  public searchQuery: string = '';

  constructor(
    private _cardService: TarjetaService,
    private _router: Router,
    private _routes: ActivatedRoute) {
      this.status = -1;
      this.card = new Tarjeta("", "", "", "", "");
      this.cards = [];
      this.filteredCards = [];
    }

    ngOnInit(): void {
      this.getCards();
    }

    navigateToAddCard(): void {
      this._router.navigate(['/add-card']);
    }

    navigateToShow(id: any): void {
      this._router.navigate(['/show-card/' + id]);
    }

    navigateToUpdate(id: any): void {
      this._router.navigate(['/update-card/' + id]);
    }

    getCards() {
      this._cardService.getCards().subscribe(
        response => {
          if (response.status === 200) {
            this.cards = response.data;
            this.filteredCards = this.cards; // Inicialmente, todas las tarjetas están en filteredCards
            this.status = response.status;
          } else {
            this.status = response.status;
          }
        },
        error => {
          console.error(error);
          this.status = error.status;
        }
      );
    }

    searchCardById(): void {
      const query = this.searchQuery.trim();
      if (query) {
        this._cardService.show(query).subscribe(
          response => {
            if (response && response.Tarjeta) {
              this.card = response.Tarjeta;
              this.filteredCards = [response.Tarjeta];
            } else {
              this.filteredCards = [];
              this.showAlert('error', 'No se encontró la tarjeta');
            }
          },
          error => {
            console.error('Error al buscar la tarjeta:', error);
            this.filteredCards = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredCards = this.cards;
      }
    }
    

    confirmDelete(id: string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destroyCard(id);
        }
      });
    }

    destroyCard(id: string) {
      console.log('Eliminando tarjeta terminada en ->' + id);
      this._cardService.destroyCard(id).subscribe(
        response => {
          if (response.status === 200) {
            console.log('Tarjeta eliminada con éxito.');
            this.cards = this.cards.filter(card => card.id !== id);
            this.filteredCards = this.filteredCards.filter(card => card.id !== id);
            this.showAlertSuccess('success',response.message);
          } else if (response.status === 400) {
            console.error('No se pudo eliminar la tarjeta:', response.error);
            Swal.fire(
              'Error',
              'No se pudo eliminar la tarjeta.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar la tarjeta:', error);
          Swal.fire(
            'Error',
            'Error al eliminar la tarjeta.',
            'error'
          );
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

    showAlertSuccess(type:'success', message: string) {
      Swal.fire({
        title: message,
        icon: type,
        timer: 2000,
        showConfirmButton: true,
        didClose : () => {
          location.reload();
        }
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          location.reload();
        }
      });;
    }
}
