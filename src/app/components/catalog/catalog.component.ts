import { Component } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers:[VehiculoService]
})
export class CatalogComponent {
  public status:number;
  public vehiculo:Vehiculo;
  public vehiculos: Vehiculo[];

  constructor(
    private _vehiculoService:VehiculoService,
    private _router:Router,
    private _routes:ActivatedRoute){
      this.status=-1;
      this.vehiculo=new Vehiculo(1, "", "", "", "", 0, 0, "", "", "");
      this.vehiculos = [];
    }

    ngOnInit(): void {
      this.getVehiculos();
    }

    navigateToAddRent(placa:string): void{
      this._router.navigate(['/add-rent-catalog/'+placa]);
    }


    getVehiculos() {
      this._vehiculoService.getCars().subscribe(
        response => {
          if (response.status === 200) {
            this.vehiculos = response.data;
            // Ordenar los vehículos por modelo en orden alfabético
            this.vehiculos.sort((a, b) => a.marca.localeCompare(b.marca));
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


