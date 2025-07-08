import { Endereco } from '../../../entities/endereco';

export interface IenderecoDao {

    findAll():Promise<Endereco[]>;

    findById(id:number): Promise<Endereco>;

     findByCampos(cep: string, rua: string, numero: string): Promise<Endereco | null>;
     
    save(endereco:Endereco): Promise<number>;

    update(endereco:Endereco): Promise<Endereco>;

    delete(id: number): Promise<number>;



}