import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public identity: any;

  

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
        this.identity = null;  // manejar el error de alguna otra forma
      }
    }
  
  }
}