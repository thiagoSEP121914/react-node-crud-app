import { cp } from "fs";
import { Endereco } from "./endereco";

export class User {

    constructor(
        public cpf:string,
        public nome: string,
        public idade: number,
        public biografia: string,
        public endereco: Endereco,
        public caminho_imagem?: string
    ) {}
}
