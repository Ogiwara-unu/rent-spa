import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private _router:Router,
    private _routes:ActivatedRoute
  ){

  }

  navigateToCatalog(){
    this._router.navigate(['/catalog']);
  }
}
