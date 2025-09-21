import express from "express";
import { RegisterRoutes } from "./routes/routes";
import { setupSwagger } from "./config/swagger";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.json()); 

setupSwagger(app);


RegisterRoutes(app);


app.listen(PORT, () => {
    console.log(`API online na porta: ${PORT}`);
    console.log(`Documentação disponível em: http://localhost:${PORT}/docs`);
});