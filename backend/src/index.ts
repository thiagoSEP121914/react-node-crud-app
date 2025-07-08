import express, {Request, Response}  from 'express';
import cors from 'cors';
import enderecoRouter from './routes/enderecoRouter';
import userRouter from "./routes/userRouter";
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api", enderecoRouter);
app.use("/api", userRouter);

let usuarios: number;
usuarios = 40;

app.listen(PORT, () => {
    console.log("Server is running at th port: ", PORT);
});