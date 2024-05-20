export class Tarjeta{
    constructor(
        public numero_tarjeta:string,
        public titular:string,
        public fecha_vencimiento:any,
        public cvv:string,
        public id :string,
    ){

    }
}