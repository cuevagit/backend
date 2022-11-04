const express = require('express');
const routerApi = express.Router();

const { controladorGetProductos,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorGetProductosSegunId,
    controladorDeleteProductosSegunId,
    controladorproductosRandom } = require("../controllers/controladorProductos");

routerApi.post('/', controladorPostProductos);
routerApi.get('/', controladorGetProductos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);
routerApi.get('/random/productosRandom', controladorproductosRandom);


exports.routerApi = routerApi;
