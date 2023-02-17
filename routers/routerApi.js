import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
    controladorPostProductos } from '../controllers/controladorProductos.js';

import { controladorPostChat } from '../controllers/controladorChat.js'

import loggerMiddleware from '../pino.js'

routerApi.post('/', loggerMiddleware, controladorPostProductos);
routerApi.get('/', loggerMiddleware, controladorGetProductos);
routerApi.post('/chat', loggerMiddleware, controladorPostChat);



export default routerApi;
