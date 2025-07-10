import { error } from 'console';
import { Endereco } from './../../../entities/endereco';
import { Pool } from "mysql";
import { IUserDao } from "../interfaces/userDao";
import { User } from '../../../entities/user';
import { promisify } from "util";
import { cp } from 'fs';
import { NotFoundError } from '../../../exception/notFoudError';


export class UserDaoImpl implements IUserDao {
    private conn: Pool;
    private query: (sql: string, values?: any) => Promise<any>;

    constructor(conn: Pool) {
        this.conn = conn;
        this.query = promisify(this.conn.query).bind(this.conn);
    }

    async findAll(): Promise<User[]> {

        try {
            const sql = `
            SELECT u.cpf, u.nome, u.idade, u.biografia, u.caminho_imagem,e.id,
            e.cep, e.estado, e.cidade, e.bairro, e.rua, e.numero
            FROM usuarios u
            JOIN enderecos e ON u.id_endereco = e.id
        `;
            const listOfUsers = await this.query(sql);

            return listOfUsers.map((row: any) => {
                const endereco = new Endereco(
                    row.id,
                    row.cep,
                    row.estado,
                    row.cidade,
                    row.bairro,
                    row.rua,
                    row.numero
                );

                return new User(
                    row.cpf,
                    row.nome,
                    row.idade,
                    row.biografia,
                    endereco,
                    row.caminho_imagem ?? ""
                );
            });

        } catch (error) {
            throw new Error(`Não foi possivel buscar os dados ${error}`)
        }
    }

    async findByCpf(cpf: string): Promise<User | null> {
        const sql = `
        SELECT u.cpf, u.nome, u.idade, u.biografia, u.caminho_imagem, e.id,
               e.cep, e.estado, e.cidade, e.bairro, e.rua, e.numero
        FROM usuarios u
        JOIN enderecos e ON u.id_endereco = e.id
        WHERE u.cpf = ?
    `;

        try {
            const result: any = await this.query(sql, [cpf]);

            if (!result || result.length === 0) {
                return null;
            }

            const row = result[0];
            const endereco = new Endereco(
                row.id,
                row.cep,
                row.estado,
                row.cidade,
                row.bairro,
                row.rua,
                row.numero
            );

            return new User(
                row.cpf,
                row.nome,
                row.idade,
                row.biografia,
                endereco,
                row.caminho_imagem ?? ""
            );

        } catch (error) {
            throw new Error(`Erro ao buscar por cpf: ${error}`);
        }
    }



    async save(user: User): Promise<User> {
        const sql = `INSERT INTO usuarios (cpf, nome, idade, biografia, caminho_imagem, id_endereco) 
        VALUES(?, ?, ?, ?, ?, ?);
        `;
        const values = [
            user.cpf,
            user.nome,
            user.idade,
            user.biografia,
            user.caminhoImagem,
            user.endereco.id
        ];

        try {
            const result: any = await this.query(sql, values);
            return user;
        } catch (error) {
            throw new Error(`Erro ao salvar usuario.: ${error}`);
        }
    }

    async update(user: User): Promise<User> {
        const sql = `
        UPDATE usuarios
        SET nome = ?, idade = ?, biografia = ?, caminho_imagem = ?, id_endereco = ?
        WHERE cpf = ?
    `;

        const values = [
            user.nome,
            user.idade,
            user.biografia,
            user.caminhoImagem || null,
            user.endereco.id,
            user.cpf
        ];

        try {
            const result: any = await this.query(sql, values);

            if (result.affectedRows === 0) {
                throw new Error("Nenhum usuário foi atualizado.");
            }
            return user;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    async delete(cpf: string): Promise<number> {
        const sql = `DELETE FROM usuarios
                     WHERE cpf = ?
        `;

        try {

            const result: any = await this.query(sql, [cpf]);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Erro ao deletar usuarios ${error}`);
        }
    }
}