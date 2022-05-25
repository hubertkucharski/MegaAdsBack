import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const AdRouter = Router()
    .get('/search/:name?', async (req, res) => {
        const ad = await AdRecord.findAll(req.params.name ?? '');

        res.json(ad)
    })
    .get('/:id', async (req, res) =>{
        const ad = await AdRecord.getOne(req.params.id)

        res.json(ad)
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert()
        res.json(ad)
    })
