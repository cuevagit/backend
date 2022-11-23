const express = require('express');
const routerApi = express.Router();

const { controladorGetProductos,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorGetProductosSegunId,
    controladorDeleteProductosSegunId,
    controladorproductosRandom } = require("../controllers/controladorProductos");

const { controladorPostChat } = require("../controllers/controladorChat.js")

routerApi.post('/', controladorPostProductos);
routerApi.get('/', controladorGetProductos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);
routerApi.get('/random/productosRandom', controladorproductosRandom);
routerApi.post('/chat', controladorPostChat);


exports.routerApi = routerApi;
