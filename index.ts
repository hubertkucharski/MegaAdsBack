import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {AdRecord} from "./records/ad.record";
// import('./utils/db');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use((req, res, next) => {
    console.log('time: ', new Date().toLocaleTimeString() )
    next()
})

// app.get('/', async (req, res) => {
//     throw new ValidationError('Hola hola!')
// })
AdRecord.getOne('jdfaskl')

app.use(handleError)

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Running server on http://localhost:3001')
})
