import { Pool } from "mysql";
import { promisify } from "util";
import { IenderecoDao } from "../interfaces/enderecoDao";
import { Endereco } from "../../../entities/endereco";
import { error } from "console";
import { NotFoundError } from "../../../exception/notFoudError";


export class EnderecoDaoImpl implements IenderecoDao {

    private pool: Pool;
    private query: (sql: string, values?: any) => Promise<any>;

    constructor(pool: Pool) {
        this.pool = pool;
        this.query = promisify(this.pool.query).bind(this.pool);
    }


    async findByCampos(cep: string, rua: string, numero: string): Promise<Endereco | null> {
        const sql = `
        SELECT * FROM enderecos 
        WHERE cep = ? AND rua = ? AND numero = ?
        LIMIT 1
    `;

        try {
            const result = await this.query(sql, [cep, rua, numero]);

            if (result.length === 0) {
                return null;
            }

            const row = result[0];
            return new Endereco(
                row.id,
                row.cep,
                row.estado,
                row.cidade,
                row.bairro,
                row.rua,
                row.numero
            );
        } catch (error) {
            throw new Error(`Erro ao buscar endereço por campos: ${error}`);
        }
    }


    async findAll(): Promise<Endereco[]> {
        const sql = `SELECT * FROM enderecos`;
        try {
            const listOfEnderecos = await this.query(sql);
            return listOfEnderecos.map((row: any) => new Endereco(
                row.id,
                row.cep,
                row.estado,
                row.cidade,
                row.bairro,
                row.rua,
                row.numero
            ));
        } catch (error) {
            throw new Error(`Erro ao buscar Endereço ${error}`);
        }
    }

    async findById(id: number): Promise<Endereco> {
        const sql = "SELECT * FROM enderecos WHERE id = ?";

        try {
            const result = await this.query(sql, [id]);

            if (result.length === 0) {
                throw new NotFoundError("Endereço não encontrado!");
            }

            const row = result[0];

            return new Endereco(
                row.id,
                row.cep,
                row.estado,
                row.cidade,
                row.bairro,
                row.rua,
                row.numero
            );
        } catch (error) {
            throw new Error(`Erro ao buscar por id ${error}`);
        }
    }

    async save(endereco: Endereco): Promise<number> {
        const sql = `INSERT INTO enderecos (cep, estado,  cidade, bairro, rua, numero)
        VALUES(?, ?, ?, ?, ?, ?);
        `

        const values = [
            endereco.cep,
            endereco.estado,
            endereco.cidade,
            endereco.bairro,
            endereco.rua,
            endereco.numero
        ];

        try {
            const result: any = await this.query(sql, values);
            return result.insertId;
        } catch (error) {
            throw new Error(`Erro ao salvar endereço: ${error}`);
        }
    }

    async update(endereco: Endereco): Promise<Endereco> {
        const sql = `UPDATE enderecos 
                     SET cep = ?, estado = ?, cidade = ?, rua = ?, numero = ?
                     WHERE id = ?
        ` ;

        try {
            const values = [
                endereco.cep,
                endereco.estado,
                endereco.cidade,
                endereco.bairro,
                endereco.rua,
                endereco.numero,
                endereco.id
            ];

            await this.query(sql, values);
            return endereco;
        } catch (error) {
            throw new Error(`Erro não foi possivel atualizar endereço ${error}`);
        }
    }


    async delete(id: number): Promise<number> {
        const sql = `DELETE FROM enderecos
                    WHERE id = ?
        `
        try {
            const result: any = await this.query(sql, [id]);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Erro ao deletar enedereço ${error}`);
        }
    }
}
