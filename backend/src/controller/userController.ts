import { Endereco } from './../entities/endereco';
import { User } from './../entities/user';
import { error } from 'console';
import { Request, Response } from "express";
import { DaoFactory } from "../repository/dao/factory/daoFactory";
import { UserService } from "../service/userService";

export class UserController {

    private useService = new UserService();

    public async findAll(req: Request, res: Response) {
        try {
            const listOfUser = await this.useService.findAll();
            return res.status(200).json(listOfUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    error: "Não foi possivel buscar dados no banco.",
                    message: error.message
                });
            }
            return res.status(500).json({ error: "Erro inesperado." })
        }
    }

    public async findCpf(req: Request, res: Response) {
        try {
            const cpf = req.params.cpf;

            if (cpf === null) {
                return res.status(404).json({ message: "O cpf não pode ser nulo" });
            }
            const user = await this.useService.findByCpf(cpf);

            if (user === null) {
                return res.status(404).json({ message: "Usuario não encontrado!" });
            }

            return res.json(user);

        } catch (error: any) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }


    public async save(req: Request, res: Response) {
        try {
            const { cpf, nome, idade, biografia, caminho_imagem, endereco } = req.body;

            if (!cpf || !nome || !idade || !endereco) {
                return res.status(400).json({
                    error: "Campos obrigatórios ausentes"
                });
            }

            if (cpf.length !== 11) {
                return res.status(404).json({ error: "Cpf invalido!!" });
            }

            const enderecoInstance = new Endereco(
                endereco.id,
                endereco.cep,
                endereco.estado,
                endereco.cidade,
                endereco.bairro,
                endereco.rua,
                endereco.numero
            );

            const user = new User(
                cpf,
                nome,
                idade,
                biografia,
                enderecoInstance,
                caminho_imagem ?? ""
            );

            const id = await this.useService.save(user);
            return res.status(201).json({ message: "Usuário salvo com sucesso!", id });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro inesperado" });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const cpf = req.params.cpf;

            if (!cpf || cpf.length !== 11) {
                return res.status(400).json({ error: "CPF inválido para atualização" });
            }

            const { nome, idade, biografia, endereco, caminho_imagem, } = req.body;

            if (!nome || !idade || !endereco) {
                return res.status(400).json({
                    error: "Campos obrigatórios ausentes para atualização"
                });
            }

            const enderecoInstance = new Endereco(
                endereco.id,
                endereco.cep,
                endereco.estado,
                endereco.cidade,
                endereco.bairro,
                endereco.rua,
                endereco.numero
            );

            const user = new User(
                cpf,
                nome,
                idade,
                biografia,
                enderecoInstance,
                caminho_imagem ?? ""
            );

            const updatedUser = await this.useService.update(user);

            return res.status(200).json({
                message: "Usuário atualizado com sucesso!",
                user: updatedUser
            });

        } catch (error: any) {
            return res.status(500).json({
                error: "Erro ao atualizar usuário",
                message: error.message
            });
        }
    }


    public async delete(req: Request, res: Response) {
        try {
            const cpf = req.params.cpf;

            if (!cpf || cpf.length !== 11) {
                return res.status(400).json({ error: "CPF inválido" });
            }

            const deletedCount = await this.useService.delete(cpf);

            if (deletedCount === 0) {
                return res.status(404).json({ error: "Usuário não encontrado para deletar" });
            }

            return res.status(200).json({ message: "Usuário deletado com sucesso!" });

        } catch (error: any) {
            if (error instanceof Error) {
                return res.status(500).json({
                    error: "Erro ao deletar usuário",
                    message: error.message
                });
            }

            return res.status(500).json({ error: "Erro inesperado" });
        }
    }

}