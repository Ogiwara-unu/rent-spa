import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
  providers:[UserService]
})
export class ViewUsersComponent {
  public status:number;
  public user:User;
  public users:User[];
  public filteredUsers: User[];
  public searchQuery: string = "";

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status = -1;
      this.user = new User(0, "", "", "", "");
      this.users = [];
      this.filteredUsers = [];
    }

    ngOnInit(): void {
      this.getUsers();
    }

    navigateToAddUser(): void {
      this._router.navigate(['/add-user']);
    }

    navigateToShow(email:any): void{
      this._router.navigate(['/show-user/'+email]);
    }

    navigateToUpdate(email:any): void{
      this._router.navigate(['/update-user/'+email]);
    }

    getUsers() {
      this._userService.getUsers().subscribe(
        response => {
          if (response.status === 200) {
            this.users = response.data;
            this.filteredUsers = this.users;
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

    searchUserByEmail(): void {
      const query = this.searchQuery;
      if (query) {
        this._userService.show(query).subscribe(
          response => {
            if (response && response.Usuario) {
              this.user = response.Usuario;
              this.filteredUsers = [response.Usuario];
            } else {
              this.filteredUsers = [];
              this.showAlert('error', 'No se encontró el Usuario');
            }
          },
          error => {
            console.error('Error al buscar el Usuario:', error);
            this.filteredUsers = [];
            this.showAlert('error', 'Error en la solicitud');
          }
        );
      } else {
        this.filteredUsers = this.users;
      }
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

    showAlert(type:'error', message: string) {
      Swal.fire({
        title: message,
        icon: type,
        timer: 1000,
        showConfirmButton: false
      });
    }
    

}