import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';


@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
  providers:[UserService]
})
export class SingupComponent {
  public status:number;
  public user:User;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status=-1; 
      this.user=new User(1,"","","","");
  }

  onSubmit(form: any) {
    console.log("Registrando Usuario :v");
    this.user.rol = 'usuario';
    this._userService.create(this.user).subscribe({
      next: (response => {
        if (response.status == 201) {
          form.reset();
          this.showAlert('success', response.message);
        } else if (response.status == 406) {
          this.showAlert('error', 'Datos inválidos >:(');
        } else {
          this.showAlert('error', response.message);
        }
      }),
      error: (error: Error) => {
        this.showAlert('error', 'Error del servidor');
      }
    });
  }
  
  
  showAlert(type: 'success' | 'error', message: string) {
    Swal.fire({
      title: message,
      icon: type,
      timer: 4000,
      showConfirmButton: false
    });
  }
  
 
}
