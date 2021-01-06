// let express = require('express');
// import { Response } from '../../../services/Response/Respond';
import express from 'express';
let app = express.Router();;
app.get('/', (req: any, res: any) => {
    // let r = new Response();
    // r.respond(res);
    res.send('hi');
})
