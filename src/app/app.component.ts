import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, OnDestroy {
  public identity: any;
  private tokenCheckInterval: any;
  private tokenCheckSubscription: Subscription | null = null;
  public status: number;

  constructor(private router: Router, private _userService: UserService) {
    this.status = -1;
    this.startTokenCheck();
  }

  ngOnInit() {
    this.loadIdentity();
  }

  ngOnDestroy() {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }

  loadIdentity() {
    const identity = sessionStorage.getItem('identity');
    console.log(identity);
    if (identity) {
      try {
        this.identity = JSON.parse(identity);
      } catch (error) {
        console.error("Invalid JSON in sessionStorage for key 'identity':", error);
        this.identity = null;
      }
    }
  }

  startTokenCheck() {
    this.tokenCheckInterval = setInterval(() => {
      this.tokenCheckSubscription = this._userService.getIdentityFromAPI().subscribe({
        next: response => {
          console.log('Usuario loggeado:', response.name);
        },
        error: error => {
          console.log('Token inválido o expirado:', error);
          this.handleInvalidToken();
        }
      });
    }, 1000);
  }

  handleInvalidToken() {
    sessionStorage.removeItem('identity');
    sessionStorage.removeItem('token');
    this.identity = null;
  }

  logout() {
    sessionStorage.removeItem('identity');
    this.identity = null;
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
