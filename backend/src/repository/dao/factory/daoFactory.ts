import dbConnection from "../../db"
import { IUserDao } from "../interfaces/userDao";
import { UserDaoImpl } from "../daoImpl/userDaoImpl";
import { IenderecoDao } from "../interfaces/enderecoDao";
import { EnderecoDaoImpl } from "../daoImpl/enderecoDaoImpl";

export class DaoFactory {
    public static createUserDao(): IUserDao {
        return new UserDaoImpl(dbConnection);
    }

    public static createEnderecoDao():IenderecoDao {
        return new EnderecoDaoImpl(dbConnection);
    }
}