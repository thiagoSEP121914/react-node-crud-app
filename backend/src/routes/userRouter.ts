import { User } from './../entities/user';
import { UserController } from './../controller/userController';
import { Router } from "express";

const router = Router();
const userControler =  new UserController();

router.get("/user", userControler.findAll.bind(userControler));
router.get("/user/:cpf", userControler.findCpf.bind(userControler));
router.post("/user", userControler.save.bind(userControler));
router.put("/user/:cpf", userControler.update.bind(userControler));
router.delete("/user/:cpf", userControler.delete.bind(userControler));

export default router;