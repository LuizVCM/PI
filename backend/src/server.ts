import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
const app: Application = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar com o banco: " + error));