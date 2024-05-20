export class Vehiculo{
    constructor(
        public id:number,
        public placa:string,
        public marca:string,
        public modelo:string,
        public transmision:string,
        public precio:number,
        public kilometraje:number,
        public anio:string,
        public estado:string,
        public img:string,
    ){

    }
}