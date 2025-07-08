import { User } from "../../../entities/user";

export interface IUserDao {
    
    findAll(): Promise<User[]>;
    
    findByCpf(cpf:string): Promise<User | null>;

    save(user:User):Promise<User>; 
   
    update(user:User):Promise<User>;

    delete(cpf:string):Promise<number>;

}