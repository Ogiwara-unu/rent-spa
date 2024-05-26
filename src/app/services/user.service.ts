import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { User } from "../models/user";
import { Observable } from "rxjs"; //Genera observable retornable al metodo que solicita la peticion

@Injectable({
    providedIn:'root' //LO LLEVA TODA PROPIEDAD INJ Y ES ROOT PQ LO DEFINO EN LA RAIZ DE LA APP
})

export class UserService{
    private urlAPI:string;
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url;
    }

    login(user:User):Observable<any>{ //retorna observable
        let userJson=JSON.stringify(user);
        let params='data='+userJson;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        let options={
            headers
        }                              /* URL DEL LOGIN */
        return this._http.post(this.urlAPI+'user/login',params,options);
    }

    getIdentityFromAPI():Observable<any>{ //OBSERVABLE ES UNA PROMESA QUE DEBE DE MANEJARSE A TRAVES DE UN ERROR
        let headers;
        let bearerToken = sessionStorage.getItem('token');
        if(bearerToken){
            headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('bearertoken',bearerToken);
        }else{
            headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'); //SETTEA SIMPLEMENTE EL CONTENT TYPE
        }
        let options = {
            headers
        }
        return this._http.get(this.urlAPI+'user/getidentity',options);
    }

    create(user: User): Observable<any> {
        let userJson = JSON.stringify(user);
        let params = 'data=' + userJson;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
          headers
        };
        return this._http.post(this.urlAPI + 'user/singup', params, options);
      
    }

}