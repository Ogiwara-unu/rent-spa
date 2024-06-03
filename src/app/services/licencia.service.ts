import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Licencia } from "../models/licencia";
import { Observable } from "rxjs"; //Genera observable retornable al metodo que solicita la peticion

@Injectable({
    providedIn: 'root' //LO LLEVA TODA PROPIEDAD INJ Y ES ROOT PQ LO DEFINO EN LA RAIZ DE LA APP
})

export class LicenciaService {
    private urlAPI: string;
    constructor(
        private _http: HttpClient
    ) {
        this.urlAPI = server.url;
    }

    getLicense(): Observable<any> {
        return this._http.get(this.urlAPI + 'licencia/getLicenses')
    }

    store(license: Licencia): Observable<any> {
        // Asignar "Imagen" al campo img
        license.img = "Imagen";
      
        let licenseJson = JSON.stringify(license);
        let params = 'data=' + licenseJson;
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
      
        return this._http.post(this.urlAPI + 'licencia', params, options);
      }
      

}