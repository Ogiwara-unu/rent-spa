import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css' ,
  providers: [UserService]
})
export class UpdateUserComponent {
  public status: number;
  public user: User;
  public upUser: User;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.user = new User(1, "", "", "", "");
    this.upUser = new User(1, "", "", "", "");
    this.loadUser();
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Actualizando usuario ->' + this.user.name);
      //SETTEO LOS VALORES ASI PQ LA RESP DEL LOAD USER TRAE UN ATRIBUTO RENTA
      //ESE ATRIBUTO GENERA UN ERROR AL TRATAR DE EDITAR
      this.upUser.name = this.user.name; 
      this.upUser.email = this.user.email; 
      this.upUser.password = this.user.password; 
      this.upUser.rol = this.user.rol; 
      this._userService.update(this.user.email, this.upUser).subscribe(
        response => {
          if (response && response.status === 200) {
           this.showAlertSuccess('success',response.message);
          } else {
            this.showAlert('error', 'No se pudo actualizar el usuario');
          }
        },
        error => {
          this.showAlert('error', 'Error en la solicitud');
        }
      );
    } else {
      this.showAlert('error', 'Formulario no válido');
    }
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
        window.location.href = '/view-users';
      }
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '/view-users';
      }
    });
  }
  
}
