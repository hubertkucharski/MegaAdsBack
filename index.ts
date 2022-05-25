import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {AdRouter} from "./routers/ad.router";
// import('./utils/db');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

app.use((req, res, next) => {
    console.log('time: ', new Date().toLocaleTimeString() )
    next()
})

app.use('/ad', AdRouter);

app.use(handleError)

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Running server on http://localhost:3001')
})
