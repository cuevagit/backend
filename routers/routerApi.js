import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
    controladorPostProductos } from '../controllers/controladorProductos.js';

import { controladorPostChat } from '../controllers/controladorChat.js'

import loggerMiddleware from '../pino.js'
import loggerErrorMiddleware from '../pinoError.js'


routerApi.post('/', loggerErrorMiddleware, loggerMiddleware, controladorPostProductos);
routerApi.get('/',  loggerMiddleware, controladorGetProductos);
routerApi.post('/chat', loggerErrorMiddleware, loggerMiddleware, controladorPostChat);



export default routerApi;
