import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import estudianteRoutes from './routes/estudianteRoutes.js';

const app= express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/estudiantes",estudianteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el pruerto ${PORT}`);
});
