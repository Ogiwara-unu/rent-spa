import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, importProvidersFrom } from "@angular/core";
import { server } from "./global";
import { Tarjeta } from "../models/tarjeta";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TarjetaService{
    private urlAPI: string;
    constructor(
        private _http: HttpClient
    ){
        this.urlAPI =server.url;
    }

    getCards(): Observable<any>{
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

        return this._http.get(this.urlAPI + 'tarjeta/getCards',options);
    }

    store(card: Tarjeta):Observable <any>{

        let cardJson = JSON.stringify(card);
        let params = 'data=' + cardJson;
        let headers;
        let bearerToken = sessionStorage.getItem('token');
   
        if(bearerToken){
            headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearerToken', bearerToken);

        }else{
            headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        }

        let options = {
            headers
        };
        
        return this._http.post(this.urlAPI + 'tarjeta/add', params, options);

    }

    destroyCard(id:string):Observable<any>{
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
  
        return this._http.delete(this.urlAPI + 'tarjeta/destroyCard/' + id ,options);
      }
}