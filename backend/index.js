import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import Cat from './models/catModel.js';
import catsRoute from './routes/catsRoute.js';
import cors from 'cors';

const app = express();

// Middleware for handling CORS POLICY
app.use(express.json());

// Middleware for handling CORS POLICY
// opt.1: allow all origin
app.use(cors());
// opt.2: allow custom origins
// app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeadrs: ['Content-Type'],
//    })
//)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stock')
});

app.use('/cats', catsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });