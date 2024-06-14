import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Renta } from '../../models/renta';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
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
  public rents:Renta[];

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.user = new User(0, "", "", "", "");
      this.rents = [];
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
