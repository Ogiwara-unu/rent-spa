import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], //ESTE ELEMT PERMITE ENLAZAR ELEMT QUE FORMAN PARTE DE UN FORMULARIO Y CARGA EL MODEL
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[UserService]
})
export class LoginComponent {
  public status:number;
  public user:User;

  constructor(private _userService:UserService){
    this.status=-1;
    this.user=new User(1,"","","","");
  }

  onSubmit(form:any){
    console.log("Iniciando sesión :v");
    // console.log(this.user.email);
    this._userService.login(this.user).subscribe({
      next:(response:any)=>{ 
        console.log(response)
        localStorage.setItem('token',response);
      },
      error:(err:any)=>{

      }
    })
  }

}
