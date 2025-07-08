import { Router } from "express";
import { EnderecoController } from "../controller/enderecoController";

const router = Router();
const enderecoController = new EnderecoController();

router.get("/enderecos", enderecoController.findAll.bind(enderecoController));
router.get("/enderecos/:id", enderecoController.findById.bind(enderecoController));
router.post("/enderecos", enderecoController.save.bind(enderecoController));
router.put("/enderecos/:id", enderecoController.update.bind(enderecoController));
router.delete("/enderecos/:id", enderecoController.delete.bind(enderecoController));

export default router;
