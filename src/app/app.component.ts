import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public identity: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadIdentity();
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

  logout() {
    sessionStorage.removeItem('identity');
    this.identity = null;
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
