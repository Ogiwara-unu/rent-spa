import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Vehiculo } from "../models/vehiculo";
import { Observable } from "rxjs"; //Genera observable retornable al metodo que solicita la peticion

@Injectable({
    providedIn: 'root' //LO LLEVA TODA PROPIEDAD INJ Y ES ROOT PQ LO DEFINO EN LA RAIZ DE LA APP
})

export class VehiculoService {
    private urlAPI: string;
    constructor(
        private _http: HttpClient
    ) {
        this.urlAPI = server.url;
    }

    getCars(): Observable<any> {
        return this._http.get(this.urlAPI + 'vehiculo/getCars')
    }

    store(vehicle: Vehiculo): Observable<any> {
        // Asignar "Imagen" al campo img
        vehicle.img = "Imagen";
      
        let vehicleJson = JSON.stringify(vehicle);
        let params = 'data=' + vehicleJson;
        let headers;
        let bearerToken = sessionStorage.getItem('token');
        if (bearerToken) {
          headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearerToken);
        } else {
          headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        }
      
        let options = {
          headers
        };
      
        return this._http.post(this.urlAPI + 'vehiculo/add', params, options);
      }
      

}