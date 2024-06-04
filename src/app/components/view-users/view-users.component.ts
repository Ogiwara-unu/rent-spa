import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

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

}
