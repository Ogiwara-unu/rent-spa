import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // ESTE ELEMENTO PERMITE ENLAZAR ELEMENTOS QUE FORMAN PARTE DE UN FORMULARIO Y CARGA EL MODEL
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  public status: number;
  public user: User;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.status = -1;
    this.user = new User(1,"","","",""); // EL 1 ES SOLO PARA INICIALIZAR EL OBJ
  }

  onSubmit(form: any) {
    console.log("Iniciando sesión :v");
    this._userService.login(this.user).subscribe({
      next: (response: any) => {
        if (response.status != 401) {
          sessionStorage.setItem('token', response); // GUARDA LOS DATOS EN EL SS PARA QUE SOLO ESTEN DISPONIBLES POR EL TIEMPO DE VIDA DE LA SESIÓN
          this._userService.getIdentityFromAPI().subscribe({
            next: (resp: any) => {
              // SE CONVIERTE EL OBJ A UN JSON
              sessionStorage.setItem('identity', JSON.stringify(resp));
              console.log("Inicio de sesión exitoso :v");
              window.location.href = ''; // REDIRECCIONA A LA RUTA DESEADA
            },
            error: (error: Error) => {
              console.log("Ha Ocurrido un error al acceder a la identidad del usuario"); // MENSAJE DE DEPURACIÓN
            }
          });
        } else {
          this.status = 0;
          this.showAlert('Usuario y/o contraseña incorrecta', 'error'); // USO SWEETALERT2
        }
      },
      error: (err: any) => {
        this.status = 1;
        this.showAlert('ERROR, error desde el servidor. Contacte a un admin unu', 'error');
      }
    });
  }

  showAlert(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: 'Oops...',
      text: message
    });
  }
}
