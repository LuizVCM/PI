import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import cookieParser from "cookie-parser";
const app: Application = express();
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT;
app.use(express.json());
app.use(router);
AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso");
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar com o banco: " + error));