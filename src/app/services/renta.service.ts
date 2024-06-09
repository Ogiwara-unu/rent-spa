import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Renta } from "../models/renta";
import { Observable } from "rxjs"; //Genera observable retornable al metodo que solicita la peticion

@Injectable({
    providedIn:'root' //LO LLEVA TODA PROPIEDAD INJ Y ES ROOT PQ LO DEFINO EN LA RAIZ DE LA APP
})

export class RentaService{
    private urlAPI:string;
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url;
    }

    store(rent: Renta): Observable<any> {
      let rentJson = JSON.stringify(rent);
      let params = 'data=' + rentJson;
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
    
      return this._http.post(this.urlAPI + 'renta/add', params, options);
    }

    

    getRents():Observable<any>{
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

          return this._http.get(this.urlAPI + 'renta/getRents', options);
    }

    destroyRent(id:number):Observable<any>{
        let headers;
        let bearerToken = sessionStorage.getItem('token');
  
        if(bearerToken){
          headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearerToken);
        } else {
          headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        }
  
        let options = {
          headers
        };
  
        return this._http.delete(this.urlAPI + 'renta/destroyRent/' + id ,options);
      }
}