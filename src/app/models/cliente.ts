export class Cliente{
    constructor(public id:number,
        public nombre:string,
        public primer_apellido:string,
        public segundo_apellido:string,
        public telefono:string,
        public email:string,
        public direccion:string,
        public fecha_nacimiento:any, //TIPO ANY PQ ES UNA FECHA
){

    }
}