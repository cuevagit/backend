import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
    controladorPostProductos } from '../controllers/controladorProductos.js';

import { controladorPostChat } from '../controllers/controladorChat.js'



routerApi.post('/',  controladorPostProductos);   //Ya hecho
routerApi.get('/',   controladorGetProductos);    //Ya hecho
routerApi.post('/chat',  controladorPostChat);    //Ya hecho



export default routerApi;
