import { error } from 'console';
import { Endereco } from '../entities/endereco';
import { DaoFactory } from "../repository/dao/factory/daoFactory";

export class EnderecoService {
  private repository = DaoFactory.createEnderecoDao();

  public findAll(): Promise<Endereco[]> {
    return this.repository.findAll();
  }

  public async findById(id: number): Promise<Endereco | null> {
  if (id <= 0) return null;

  return await this.repository.findById(id);
 
}

  public save(endereco: Endereco): Promise<number> {
    return this.repository.save(endereco);
  }

  public update(endereco: Endereco): Promise<Endereco> {
    return this.repository.update(endereco);
  }

  public delete(id: number): Promise<number> {
    return this.repository.delete(id);
  } 
}
