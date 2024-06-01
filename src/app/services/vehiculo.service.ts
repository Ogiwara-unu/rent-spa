import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { Vehiculo } from "../models/vehiculo";
import { Observable } from "rxjs"; //Genera observable retornable al metodo que solicita la peticion

@Injectable({
    providedIn:'root' //LO LLEVA TODA PROPIEDAD INJ Y ES ROOT PQ LO DEFINO EN LA RAIZ DE LA APP
})

export class VehiculoService{
    private urlAPI:string;
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI=server.url;
    }

    getCars():Observable<any>{
        return this._http.get(this.urlAPI+'vehiculo/getCars')
    }

   


}