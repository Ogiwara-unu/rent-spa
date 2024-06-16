import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Renta } from '../../models/renta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.css',
  providers:[UserService]
})
export class ShowUserComponent {
  public status: number;
  public user: User;
  public rent:Renta;
  public rents:Renta[];
  public filteredRents: Renta[];
  public searchQuery: string = "";

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.user = new User(0, "", "", "", "");
      this.rent = new Renta(0,0,0,0,"",0,"","",0);
      this.rents = [];
      this.filteredRents = [];
    }

    ngOnInit() {
      this.loadUser();
    }

    loadUser() {
      this._routes.params.subscribe(
        params => {
          let emailUser = params['email'];
          if (emailUser) {
            this._userService.show(emailUser).subscribe(
              response => {
                if (response && response.Usuario) {
                  this.user = response.Usuario;
                  this.rents = response.Usuario.renta;
                  this.filteredRents = this.rents;
                } else {
                  this.showAlert('error', 'No se pudo cargar el usuario');
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
        if (this.user.id) {
          this.filteredRents = this.rents.filter(rent => rent.user_id === this.user.id);
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
      });
    }
}
