import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, importProvidersFrom } from "@angular/core";
import { server } from "./global";
import { Cliente } from "../models/cliente";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ClienteService{
    private urlAPI: string;
    constructor(
        private _http: HttpClient
    ){
        this.urlAPI = server.url;
    }

    getClients(): Observable<any>{
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

        return this._http.get(this.urlAPI + 'cliente/getClients', options);
    }

    store(client: Cliente):Observable <any>{

        let clientJson = JSON.stringify(client);
        let params = 'data=' + clientJson;
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
        
        return this._http.post(this.urlAPI + 'cliente/add', params, options);

    }

    update(id:number , client:Cliente):Observable<any>{
        let clientJson = JSON.stringify(client);
        let params = 'data=' + clientJson;
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

        return this._http.put(this.urlAPI + 'cliente/updateClient/' + id , params,options);
    }

    show(id:number):Observable<any>{
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

        return this._http.get(this.urlAPI + 'cliente/getClient/' + id,options);
    }

    destroyClient(id:number):Observable<any>{
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
  
        return this._http.delete(this.urlAPI + 'cliente/destroyClient/' + id ,options);
      }
}