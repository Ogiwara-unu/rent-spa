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

  update(placa:string , vehicle:Vehiculo):Observable<any>{
    let vehicleJson = JSON.stringify(vehicle);
    let params = 'data=' + vehicleJson;
    let headers;
    let bearerToken = sessionStorage.getItem('token');

    if(bearerToken){
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearerToken);
    }else{
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }

    let options = {
        headers
    };

    return this._http.put(this.urlAPI + 'vehiculo/updateCar/' + placa , params,options);
  }

  show(placa:string):Observable<any>{
    let headers;
    let bearerToken = sessionStorage.getItem('token');

    if(bearerToken){
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearerToken);
    }else{
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }

    let options = {
        headers
    };

    return this._http.get(this.urlAPI + 'vehiculo/getCar/' + placa ,options);
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file0', file, file.name);
    let headers = new HttpHeaders();
    let bearerToken = sessionStorage.getItem('token');
    if (bearerToken) {
      headers = headers.set('bearertoken', bearerToken);
    }

    return this._http.post(this.urlAPI + 'vehiculo/upload', formData, { headers });
  }



  getVehicles(): Observable<any> {
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

    return this._http.get(this.urlAPI + 'vehiculo/getCars', options);
  }

  destroyVehicle(placa: string): Observable<any> {
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

    return this._http.delete(this.urlAPI + 'vehiculo/destroyCar/' + placa, options);
  }


}