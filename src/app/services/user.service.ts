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

}