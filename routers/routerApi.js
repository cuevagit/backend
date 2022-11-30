import express from 'express';
const routerApi = express.Router();

import { controladorGetProductos,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorGetProductosSegunId,
    controladorDeleteProductosSegunId,
    controladorproductosRandom } from '../controllers/controladorProductos.js';

import { controladorPostChat } from '../controllers/controladorChat.js'

routerApi.post('/', controladorPostProductos);
routerApi.get('/', controladorGetProductos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);
routerApi.get('/random/productosRandom', controladorproductosRandom);
routerApi.post('/chat', controladorPostChat);


export default routerApi;
