import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
    controladorPostProductos } from '../../controllers/controllers/controladorProductos.js';

import { controladorPostChat } from '../../controllers/controllers/controladorChat.js'



routerApi.post('/',  controladorPostProductos);    
routerApi.get('/',   controladorGetProductos);     
routerApi.post('/chat',  controladorPostChat);     



export default routerApi;
