import express from 'express';
import 'colors'; 
import dotenv from 'dotenv';
import connectDB from './Config/connect.js'; 
import transactionRouter from './Routes/transactionRoutes.js';
import databaseRoutes from './Routes/databaseRoutes.js';

const app = express(); 
import cors from 'cors';

app.use(express.json()) 

dotenv.config(); 

connectDB(); 

app.use(
    cors({
        credentials: true,
        origin:'http://localhost:5173'
    })
);

// Middlewares
app.use('/', databaseRoutes) 
app.use('/', transactionRouter); 

app.listen(process.env.PORT, ()=> {
    console.log(`--> server is live on https://localhost:${process.env.PORT} <--`.blue.italic)
})
