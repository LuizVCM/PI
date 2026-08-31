import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import router from "./routes/index.routes";
import { errorHandler } from "./middlewares/error-handler";
import cookieParser from "cookie-parser";
import { insertPlants } from "./config/seed/plant.seeder";
const app: Application = express();
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT;
app.use(express.json());
app.use(router);
async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Banco conectado com sucesso");
    await insertPlants();
    console.log("Dados inseridos com sucesso");
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar aplicação: ", error);
  }
}
startServer();