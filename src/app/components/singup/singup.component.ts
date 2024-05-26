import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


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
      this.status=2; //SE INICIALIZA EN "error del servidor"
      this.user=new User(1,"","","","");
  }

  onSubmit(form:any){
    console.log("Registrando Usuario :v");

  }

}
