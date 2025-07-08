import { Endereco } from "../entities/endereco";
import { User } from "../entities/user";
import { DaoFactory } from "../repository/dao/factory/daoFactory";


export class UserService {

    private userRepository = DaoFactory.createUserDao();

    private enderecoRepository = DaoFactory.createEnderecoDao();

    public findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    public findByCpf(cpf: string): Promise<User | null> {
        return this.userRepository.findByCpf(cpf);
    }


    public async save(user: User): Promise<User> {
        const existingUser = await this.findByCpf(user.cpf);
        if (existingUser) {
            throw new Error("O usuário já existe");
        }

        user.endereco.id = await this.ensureEndereco(user.endereco);
        await this.userRepository.save(user);

        return user;
    }



    public async update(user: User): Promise<User> {
        user.endereco.id = await this.ensureEndereco(user.endereco);
        await this.userRepository.update(user);

        return user;
    }



    public delete(cpf: string): Promise<number> {
        return this.userRepository.delete(cpf);
    }

    private async ensureEndereco(endereco: Endereco): Promise<number> {
        const existingEndereco = await this.enderecoRepository.findByCampos(
            endereco.cep,
            endereco.rua,
            endereco.numero
        );

        if (existingEndereco) {
            return existingEndereco.id;
        } else {
            return await this.enderecoRepository.save(endereco);
        }
    }
}