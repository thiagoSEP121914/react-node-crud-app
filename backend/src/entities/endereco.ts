
export class Endereco {

    constructor(
        public id:number,
        public cep:string,
        public estado:string,
        public cidade:string,
        public bairro:string,
        public rua:string,
        public numero:string,
    ){
        if(cep.length !== 8) {
            throw new Error("O cep deve ser igual a 8");
        }
    }
}