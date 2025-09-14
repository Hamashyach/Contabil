import express from "express";
import { RegisterRoutes } from "./routes/routes";
import { setupSwagger } from "./config/swagger";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const PORT = 3040;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);

app.use('/api', apiRouter);

RegisterRoutes(app);

setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));