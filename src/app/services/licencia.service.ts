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

    getLicenses(): Observable<any> {
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

        return this._http.get(this.urlAPI + 'licencia/getLicenses', options);
    }

    store(license: Licencia): Observable<any> {
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
      
      console.log(params);
      return this._http.post(this.urlAPI + 'licencia/add', params, options);
    }

    uploadImage(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file0', file, file.name);
      let headers = new HttpHeaders();
      let bearerToken = sessionStorage.getItem('token');
      if (bearerToken) {
        headers = headers.set('bearertoken', bearerToken);
      }
  
      return this._http.post(this.urlAPI + 'licencia/upload', formData, { headers });
    }

      destroyLicense(id:number):Observable<any>{
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

      return this._http.delete(this.urlAPI + 'licencia/destroyLicense/' + id ,options);
      }
      

}