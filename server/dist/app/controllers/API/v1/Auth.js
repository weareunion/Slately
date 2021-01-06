"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// let express = require('express');
// import { Response } from '../../../services/Response/Respond';
const express_1 = __importDefault(require("express"));
let app = express_1.default.Router();
;
app.get('/', (req, res) => {
    // let r = new Response();
    // r.respond(res);
    res.send('hi');
});
