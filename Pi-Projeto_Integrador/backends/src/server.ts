import express from 'express'
import * as dotenv from 'dotenv'
import { AppDataSource } from './config/data-source'
// import { index } from './routes/index'
import { errorHandler } from './middlewares/ErrorHandler'
import embrapaRoutes from './routes/embrapa.routes'

const app = express()
dotenv.config()
const PORT = process.env.PORT 
app.use(express.json())
// app.use(routes) 

AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso!!!!!!!!!")

    app.use(errorHandler)
app.use('/api/embrapa', embrapaRoutes);
    app.listen(PORT, () => {
        console.log("servidor backend no ar!!!!!!!   Porta: "+ PORT)
    })
}).catch((error) => console.log("Erro ao conectar com o banco: "+error));