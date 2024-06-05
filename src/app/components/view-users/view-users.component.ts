import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
  providers:[UserService]
})
export class ViewUsersComponent {
  public status:number;
  public user:User;
  public users:User[];

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.user = new User(0, "", "", "", "");
      this.users = [];
    }

    ngOnInit(): void {
      this.getUsers();
    }

    navigateToAddUser(): void {
      this._router.navigate(['/add-user']);
    }

    getUsers() {
      this._userService.getUsers().subscribe(
        response => {
          if (response.status === 200) {
            this.users = response.data;
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

    confirmDelete(email: string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar unu'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destroy(email);
        }
      });
    }

    destroy(email: string) {
      console.log('Eliminando usuario con email ->' + email);
      this._userService.destroyUser(email).subscribe(
        response => {
          if (response.status === 200) {
            console.log('Usuario eliminado con éxito.');
            this.users = this.users.filter(user => user.email !== email);
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          } else if (response.status === 400) {
            console.error('No se pudo eliminar el usuario:', response.error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el usuario, compruebe que exista.',
              'error'
            );
          }
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire(
            'Error',
            'Hubo un error al eliminar el usuario.',
            'error'
          );
        }
      );
    }
    

}