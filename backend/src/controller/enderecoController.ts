import { Endereco } from '../entities/endereco';
import { Request, Response } from "express";
import { EnderecoService } from "../service/enderecoService";


export class EnderecoController {

    private service = new EnderecoService();

    public async findAll(req: Request, res: Response) {
        try {
            const enderecos = await this.service.findAll();
            return res.json(enderecos);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "Id inválido" });
            }

            const endereco = await this.service.findById(id);
            if (endereco === null) {
                return res.status(404).json({ message: "Enderaço não encontrado" });
            }
            return res.json(endereco);

        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }


    public async save(req: Request, res: Response) {
        try {
            const { cep, estado, cidade, bairro, rua, numero } = req.body;
            const endereco = new Endereco(
                0,
                cep,
                estado,
                cidade,
                bairro,
                rua,
                numero
            );

            if (!cep) {
                return res.status(400).json()
            }

            const id = await this.service.save(endereco);
            return res.status(201).json({ message: "Endereco salvo com sucesso!", id })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro inesperado." });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "Id invalido!" });
            }

            const { cep, estado, cidade, bairro, rua, numero } = req.body;
            const endereco = new Endereco(id, cep, estado, cidade, bairro, rua, numero);

            const enderecoAtualizado = await this.service.update(endereco);

            return res.status(200).json({
                mensage: "Endereco atualizado com sucesso",
                endereco: enderecoAtualizado
            });

        } catch (error) {

            if (error instanceof Error) {
                return res.status(500).json({
                    error: "Erro ao atualizar os dados.", message: error.message
                });
            }
            return res.status(500).json({
                error: "Erro ao atualizar os dados",
                message: "Erro desconhecido."
            })
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "Id invalido" });
            }

            const deletedId = await this.service.delete(id);

            if (deletedId === 0) {
                return res.status(404).json({ error: "Endereço não encontrado " });
            }

            return res.status(200).json({ message: "Endereço deletado com sucesso!" });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro inesperado." });
        }
    }
}
