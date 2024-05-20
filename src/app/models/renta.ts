export class Renta{
    constructor(
        public id:number,
        public user_id:number,
        public cliente_id:number,
        public vehiculo_id:number,
        public tarjeta_id:string,
        public tarifa_base:number,
        public fecha_entrega:any,
        public fecha_devolucion:any,
        public total:number,
    ){

    }
}